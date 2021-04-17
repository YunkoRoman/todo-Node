const dataBase = require('../dataBase/index').getInstance();

class listController {

    async saveListName(req, res, next) {

        try {

            const {fileName, text} = req.body;

            const listModel = dataBase.getModel('list');

            const result = await listModel.create({
                text,
                fileName
            });
            res.json({
                success: true,
                msg: result
            });

        } catch (e) {
            next(e)
        }
    }

    async getAllLists(req, res, next) {
        try {
            const listModel = dataBase.getModel('list');

            const result = await listModel.findAll();

            // let sortArray = result.sort((a, b) => {
            //     return new Date(a.dateLastNote) - new Date(b.dateLastNote)
            // });
            res.json({
                success: true,
                msg: result
            });

        } catch (e) {
            next(e)
        }
    }

    async changeCategory(req, res, next) {

            //change date in category for array sort
            //when save note or update
        try {
            const {startDate: date} = req.body;
            const {id} = req.params;
            const categoryModel = dataBase.getModel('category');
            const result = await categoryModel.findOne({
                where: {
                    id
                }
            });

            if (Date.parse(result.dateLastNote) > Date.parse(date) || result.dateLastNote === null) {
                await categoryModel.update({
                        dateLastNote: date
                    }, {

                        where: {
                            id
                        }
                    }
                );
            }


            res.json({
                success: true,
            });

        } catch (e) {
            next(e)
        }

    }
}

module.exports = new listController()