const router = require('express').Router();

const categoryController = require('../controllers/category.controller');

router.post('/save', categoryController.saveCategory);
router.put('/change/:id', categoryController.changeCategory);
router.get('/', categoryController.getAllCatgory);


module.exports = router;