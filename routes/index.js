var task_controller = require('../controllers/tasks');

module.exports = function(app, passport) {

  // Application index
  app.get('/', function(req, res) {
    res.send('Index');
  });

  // Task routes
  app.get('/tasks', isLoggedIn, task_controller.task_list);
  app.post('/tasks/create', isLoggedIn, task_controller.task_create);
  app.get('/tasks/:id', isLoggedIn, task_controller.task_view);
  app.put('/tasks/:id', isLoggedIn, task_controller.task_update);
  app.delete('/tasks/:id', isLoggedIn, task_controller.task_delete);

  // Authentication routes
  app.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.send('OK');
  });

  app.post('/login', passport.authenticate('local-login'), function(req, res) {
    res.send('Logged in as: ' + req.user.local.email);
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signup-success',
    failureRedirect: '/signup-error'
  }));

  app.get('/signup-success', function(req, res) {
    res.send('User created successfully!');
  });

  app.get('/signup-error', function(req, res) {
    res.send('Invalid data!');
  });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.status(403).send("You must log in to access this page!");
}
