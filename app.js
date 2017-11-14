// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 80;
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dbConfig = require('./config/database.js');

// Database ===============================================================
mongoose.connect(dbConfig.url, {
  useMongoClient: true
}); // connect to our database
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
// =========================================================================

require('./config/passport')(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(bodyParser.json());

// required for passport
app.use(
  session({
    secret: 'iuhAUHuhoaoiAF*)21hoIOAF1h0asoif',
    resave: true,
    saveUninitialized: true,
  })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes ======================================================================
require('./routes/index.js')(app, passport);



// Cron ========================================================================
var scheduleVerificationTime = 5000;
var Task = require('./models/task');

//*
var scheduler = setInterval(function() {

  var moment = require('moment');
  var now = moment().format();

  console.log('-----------------------------');
  console.log("Calling tasks at: " + now);
  console.log('-----------------------------');

  // look for tasks not ended
  var query = Task.find({
    ended: false,
    next_call_date: {
      $lte: now
    }
  });
  query.exec(function(err, tasks) {
    if (err) {
      console.log("Error querying tasks: ");
      console.log(err);
    } else {
      tasks.forEach(function(elm) {
        console.log("task found");
        console.log(elm.next_call_date);
        elm.run();
      });
    }
  });

}, scheduleVerificationTime);
//*/
// =============================================================================


// launch ======================================================================
app.listen(port);
console.log('We are live on port: ' + port);
