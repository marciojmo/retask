var express = require('express');
var router = express.Router();

// Require controllers
var task_controller = require('../controllers/tasks');


/*
// GET request for creating Task.
router.get('/create', task_controller.task_create_get);
// POST request for creating Task.
router.post('/create', task_controller.task_create_post);
// GET request to delete Task.
router.get('/:id/delete', task_controller.task_delete_get);
// POST request to delete Task
router.post('/:id/delete', task_controller.task_delete_post);
// GET request to update Task.
router.get('/:id/update', task_controller.task_update_get);
// POST request to update Task
router.post('/:id/update', task_controller.task_update_post);
// GET request for one Task.
router.get('/:id', task_controller.task_detail);
// GET request for list of all Tasks.
router.get('', task_controller.task_list);
*/

router.get( '/', task_controller.task_list );
router.post( '/create', task_controller.task_create );
router.get( '/:id', task_controller.task_view );
router.put( '/:id', task_controller.task_update );
router.delete( '/:id', task_controller.task_delete );


// Export this router
module.exports = router;
