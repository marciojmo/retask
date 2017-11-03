const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));


///*
// Import the mongoose module
var mongoose = require('mongoose');
// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/retask';
mongoose.connect( mongoDB, { 'useMongoClient' : true } );
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//*/


// Requiring routes
var tasks = require('./routes/tasks');

// Using routes
app.use( '/', tasks );

// Entry point
app.listen(port, () => {
  console.log('We are live on ' + port);
});
