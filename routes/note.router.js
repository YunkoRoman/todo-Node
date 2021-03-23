const router = require('express').Router();

const noteController = require('../controllers/note.controller');

router.post('/save', noteController.saveNote);
router.get('/:id', noteController.getNote);
router.delete('/:id', noteController.deleteNote);
router.put('/:id', noteController.changeNote);


module.exports = router;