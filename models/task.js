var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var moment = require('moment');

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
  console.log("Calling URL: " + this.callback_url);
  this.updateNextCallDate();
};

taskSchema.methods.updateNextCallDate = function() {
  // Set the next date to 1 minute later
  var next_date = moment(this.next_call_date);
  next_date.add(1, 'm');

  this.next_call_date = next_date.format();

  this.save(function(err, obj) {
    if (err) {
      console.log("Error to update task: " + obj.id);
    } else {
      console.log("Next call after update: " + obj.next_call_date);
    }
  })

};

module.exports = mongoose.model('Task', taskSchema);
