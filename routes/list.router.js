const router = require('express').Router();

const listController = require('../controllers/list.controller');

router.post('/save', listController.saveListName);
router.put('/change/:id', listController.changeCategory);
router.get('/', listController.getAllLists);


module.exports = router;