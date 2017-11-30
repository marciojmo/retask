var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var moment = require('moment');

var request = require('request');

var taskSchema = new Schema({
  callback_url: {
    type: String,
    required: true
  },
  http_method: {
    type: String,
    enum: ["GET", "POST", "PUT", "DELETE"],
    required: true
  },
  ended: {
    type: Boolean,
    required: true,
    default: false
  },
  data: {
    type: String,
    required: false
  },
  auth_user: {
    type: String,
    required: false
  },
  auth_pass: {
    type: String,
    required: false
  },
  auth_token: {
    type: String,
    required: false
  },
  start_date: {
    type: String,
    default: moment().format(),
    required: false
  },
  end_type: {
    type: String,
    enum: ["NO_END", "END_BY_COUNTER", "END_BY_DATE"],
    required: true
  },
  end_date: {
    type: String,
    required: false
  },
  end_count: {
    type: Number,
    required: false
  },
  repeat_type: {
    type: String,
    enum: [
      "NO_REPEAT", "EVERY_SECOND", "DAILY",
      "WEEKLY", "MONTHLY", "YEARLY"
    ],
    required: true
  },
  repeat_every: {
    type: Number,
    required: false
  },
  repeat_weekly_mask: {
    type: String,
    required: false
  },
  next_call_date: {
    type: String,
    required: false
  },
});

taskSchema.methods.run = function() {
  // Calling the callback_url
  var request = require('request');

  var requestParams = {
    method: this.http_method,
    uri: this.callback_url,
  };

  if ( this.data.length > 0 )
  {
    requestParams.multipart = [ { 'content-type': 'application/json', body: this.data } ];
  }

  request( requestParams,
    function (error, response, body) {
      if (response === undefined )
      {
        console.log( "[error] request failed without a response" );
      }
      else if(response.statusCode == 201){
        console.log("[ " + this.callback_url + " RESULT]");
        console.log(body);
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
  ).auth( this.auth_user, this.auth_pass, false, this.auth_token );

  // Updating the next call date
  this.updateNextCallDate();
};

taskSchema.methods.updateNextCallDate = function() {

  // UPDATING THE REPETITION
  var next_date = moment(this.next_call_date);
  if ( this.repeat_type == 'EVERY_SECOND' )
    next_date.add( this.repeat_every, 's' );
  else if ( this.repeat_type == 'DAILY' )
    next_date.add( this.repeat_every, 'd' );
  else if ( this.repeat_type == 'WEEKLY' )
  {
    var weekDay = next_date.weekday()%7;
    var lastWeekDay = this.repeat_weekly_mask.lastIndexOf('1');
    if ( weekDay == lastWeekDay )
    {
      var firstWeekDay = this.repeat_weekly_mask.indexOf('1');
      // if we are in the last week day call, we go subtract the difference
      // to the first week day call and add a week to the next date
      // (equivalent to call the first week day in the next week).
      var deltaDays = lastWeekDay - firstWeekDay;
      // repeat weekly must have a special treatment (check week mask)
      next_date.subtract( deltaDays, 'd' ).add( this.repeat_every, 'w' );
    }
    else
    {
      // If it is not the last week day call, look for the next day
      // and add it to the date.
      for( var i = weekDay + 1; i < this.repeat_weekly_mask.length; i++ )
      {
        if ( this.repeat_weekly_mask[i] == '1' )
        {
          var delta = i - weekDay;
          next_date.add( delta, 'd' );
          break;
        }
      }
    }
  }
  else if ( this.repeat_type == 'MONTHLY' )
    next_date.add( this.repeat_every, 'M' );
  else if ( this.repeat_type == 'YEARLY' )
    next_date.add( this.repeat_every, 'y' );
  else
    this.ended = true;

  this.next_call_date = next_date.format();

  // CHECKING THE END OF THE TASK SCHEDULING
  if ( this.end_type == 'END_BY_COUNTER' )
  {
    this.end_count--;
    if (this.end_count == 0 )
      this.ended = true;
  }
  else if ( this.end_type == 'END_BY_DATE' )
  {
    if ( moment(this.next_call_date) > moment(this.end_date) )
      this.ended = true;
  }

  // SAVE CHANGES
  this.save(function(err, obj) {
    if (err) {
      console.log("Error to update task: " + obj.id);
    } else {
      console.log("Next call after update: " + obj.next_call_date);
    }
  });

};

module.exports = mongoose.model('Task', taskSchema);
