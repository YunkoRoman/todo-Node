const dataBase = require('../dataBase/index').getInstance();

class categoryController {

    async saveNote(req, res, next) {

        try {
            const {text, name, date, category_id} = req.body;
            const noteModel = dataBase.getModel('note');

            const result = await noteModel.create({
                text,
                date,
                name,
                category_id
            });

            res.json({
                success: true,
                msg: result
            });

        } catch (e) {
            next(e)
        }
    }

    async deleteNote(req, res, next) {
        try {
            const {id} = req.params;
            console.log(id);
            const noteModel = dataBase.getModel('note');

            const result = await noteModel.destroy({
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

    async getNote(req, res, next) {
        try {
            const {id} = req.params;

            const noteModel = dataBase.getModel('note');

            const result = await noteModel.findAll(
                {
                    where: {
                        category_id: id
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

    async changeNote(req, res, next) {
        try {
            const {id} = req.params;
            const {text, name, date} = req.body;
            const noteModel = dataBase.getModel('note');

            const result = await noteModel.update({text, name, date}, {
                where: {
                    id
                }
            })
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