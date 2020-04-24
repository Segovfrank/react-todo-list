const router = require('express').Router();
const tasksController = require('../controllers/TasksController');

router.get('/tasks', tasksController.getAll);

router.post('/tasks', tasksController.store);

router.delete('/tasks/:id', tasksController.delete);

router.post('/tasks/:id/done', tasksController.done);

module.exports = router;
