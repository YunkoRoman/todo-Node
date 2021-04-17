

class UploadController {

    async saveLogo(req, res, next) {

        try {

            res.json({
                success: true,
                msg: req.file.filename
            });

        } catch (e) {
            next(e)
        }
    }


}

module.exports = new UploadController();