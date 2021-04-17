const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const {v4: uuidv4} = require('uuid');
const dataBase = require('./dataBase').getInstance();
const multer = require('multer')


const app = express();
const {
    StatusCodes,
    getReasonPhrase,
} = require('http-status-codes');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors());
app.options('*', cors());

dotenv.config();

const {listRouter, todoRouter, uploadRouter} = require("./routes");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage: storage});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Connect to DB
dataBase.setModels();
const PORT = process.env.PORT;

app.use('/upload', upload.single('logo'), uploadRouter);
app.use('/list', listRouter);
app.use('/todo', todoRouter);


app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            code: err.code,
        });
});

app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`Server listen on port ${PORT}`);
});