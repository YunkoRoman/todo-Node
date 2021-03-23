const dataBase = require('../dataBase/index').getInstance();

class categoryController {

    async saveCategory(req, res, next) {

        try {
            const {text} = req.body;
            console.log(text);
            const categoryModel = dataBase.getModel('category');

            const result = await categoryModel.create({
                text
            });

            res.json({
                success: true,
                msg: result
            });

        } catch (e) {
            next(e)
        }
    }

    async getAllCatgory(req, res, next) {
        try {
            const categoryModel = dataBase.getModel('category');

            const result = await categoryModel.findAll();
            let sortArray = result.sort((a, b) => {
                return new Date(a.dateLastNote) - new Date(b.dateLastNote)
            });
            res.json({
                success: true,
                msg: sortArray
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

module.exports = new categoryController()