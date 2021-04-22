const router = require('express').Router();

const todoController = require('../controllers/todo.controller');

router.get('/checked', todoController.getAllCheckedTodo);
router.get('/:id', todoController.getAllTodo);
router.post('/save', todoController.saveTodo);
router.delete('/:id', todoController.deleteTodo);
router.put('/checked/:id', todoController.changeСheckedTodo);
router.put('/:id', todoController.editTodo);


module.exports = router;