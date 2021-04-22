const dataBase = require('../dataBase/index').getInstance();

class categoryController {

    async saveTodo(req, res, next) {

        try {
            const {text, startDate:date, list_id, checked} = req.body;

            const todoModel = dataBase.getModel('todo');

            const result = await todoModel.create({
                text,
                date,
                list_id,
                checked
            });

            res.json({
                success: true,
                msg: result
            });

        } catch (e) {
            next(e)
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const {id} = req.params;

            const todoModel = dataBase.getModel('todo');

            const result = await todoModel.destroy({
                where: {
                    id
                }
            });

            res.json({
                success: true,
                msg: result
            });
        } catch (e) {
            next(e)
        }
    }

    async getAllTodo(req, res, next) {
        try {
            const {id} = req.params;

            const todoModel = dataBase.getModel('todo');

            const result = await todoModel.findAll(
                {
                    where: {
                        list_id: id,
                        checked: false
                    }
                }
            );
            let sortArray = result.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });

            res.json({
                success: true,
                msg: sortArray
            });

        } catch (e) {
            next(e)
        }
    }

    async getAllCheckedTodo(req, res, next) {
        try {

            console.log('Check');
            const todoModel = dataBase.getModel('todo');

            const result = await todoModel.findAll(
                {
                    where: {
                        checked: true
                    }
                }
            );
            let sortArray = result.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });

            res.json({
                success: true,
                msg: sortArray
            });

        } catch (e) {
            next(e)
        }
    }

    async changeСheckedTodo(req, res, next) {
        try {
            const {id} = req.params;

            const {checked} = req.body;

            const listModel = dataBase.getModel('todo');

            const result = await listModel.update({checked}, {
                where: {
                    id
                }
            });
            res.json({
                success: true,
                msg: result
            });
        } catch (e) {
            next(e)
        }
    }
    async editTodo(req, res, next) {
        try {
            const {id} = req.params;

            const {text, date} = req.body;

            const listModel = dataBase.getModel('todo');

            const result = await listModel.update({text, date}, {
                where: {
                    id
                }
            });
            res.json({
                success: true,
                msg: result
            });
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new categoryController();