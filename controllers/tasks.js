var Task = require('../models/task');

// Lists all tasks
exports.task_list = function(req, res) {
  var query = Task.find();
  query.exec(function(err, tasks) {
    if (err)
      res.status(500).send({
        error: err.message
      });
    else
      res.send(tasks);
  });
};

// Display details of an specific task
exports.task_view = function(req, res) {
  var query = Task.find({
    _id: req.params.id
  });
  query.exec(function(err, tasks) {
    if (err)
      res.status(500).send({
        error: err.message
      });
    else
      res.send(tasks[0]);
  });
};

// Create a new Task
exports.task_create = function(req, res) {
  var moment = require('moment');
  // Create a new task object and save it
  var task = new Task(req.body);
  // Set the dates accordingly
  task.start_date = moment(req.body.start_date).format();
  task.next_call_date = moment(req.body.start_date).format();
  task.save(function(err) {
    if (err)
      res.status(500).send({
        error: err.message
      });
    else
      res.send("OK");
  });
};

// Deletes an specific task
exports.task_delete = function(req, res) {
  var query = Task.find({
    _id: req.params.id
  }).remove();
  query.exec(function(err, tasks) {
    if (err)
      res.status(500).send({
        error: err.message
      });
    else
      res.send('OK');
  });
};


// Updates an specific Task
exports.task_update = function(req, res) {
  var query = Task.findOneAndUpdate({
    _id: req.params.id
  }, req.body);
  query.exec(function(err, tasks) {
    if (err)
      res.status(500).send({
        error: err.message
      });
    else
      res.send('OK');
  });
};
