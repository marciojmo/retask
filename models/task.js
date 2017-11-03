var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var taskSchema = new Schema({
  	callback_url : { type : String, required : true },
  	http_method : {
      type : String,
      enum : [ "GET", "POST", "PUT", "DELETE" ],
      required : true
    },
  	data : { type : String, required : false },
  	auth_user : { type : String, required : false },
  	auth_pass : { type : String, required : false },
  	auth_token : { type : String, required : false },
  	start_date : { type: Date, default: Date.now, required : false },
  	end_type : {
      type : String,
      enum : [ "NO_END", "END_BY_COUNTER", "END_BY_DATE" ],
      required: true
    },
  	end_date : { type: Date, required : false },
  	end_count : { type: Number, required : false },
  	repeat_type : {
      type : String,
      enum : [
        "NO_REPEAT", "EVERY_SECOND", "DAILY",
        "WEEKLY", "MONTHLY", "YEARLY"
      ],
      required : true
    },
  	repeat_every : { type : Number, required : false },
  	repeat_weekly_mask : { type: String, required : false }
});


module.exports = mongoose.model( 'Task', taskSchema );
