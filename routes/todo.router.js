const router = require('express').Router();

const todoController = require('../controllers/todo.controller');

router.post('/save', todoController.saveTodo);
router.get('/:id', todoController.getAllTodo);
router.delete('/:id', todoController.deleteTodo);
router.put('/checked/:id', todoController.changeСheckedTodo);


module.exports = router;