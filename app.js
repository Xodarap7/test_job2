// подключение express
const express = require("express");
// const { mongoose } = require("mongoose");
const multer = require("multer");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")
    // создаем объект приложения
const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})
let figureFileName;
app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
app.use(bodyParser.json())

// app.use(function(req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

const Figures = require("./models/Figures")

// Внешние файлы
const { getObjects } = require("./js/readFile");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig }).single("figurefile.txt"));

// определяем обработчик для маршрута

app.get('/', async(req, res) => {
    const figures = await Figures.find({}).lean();

    res.render('index', {
        title: 'Главная',
        isIndex: true,
        figures
    })
})

app.get("/api/", function(req, res) {
    const content = getObjects(figureFileName);
    console.log("Content is ", content);
    res.send(content);
});

// app.get("/figure", function(req, res) {
//     // отправляем ответ
//     res.sendFile(__dirname + "/html/figures.html");
// });

app.post("/upload", async(req, res, next) => {
    let figurefile = req.file;
    if (!figurefile) res.send("Ошибка при загрузке файла");
    else {

        const figures = new Figures({
            fileName: figurefile.originalname
        })
        try {
            await figures.save()
            res.sendFile(__dirname);
            res.redirect('/');
        } catch (e) {
            console.log(e);
            res.redirect('/');

        }

    }
});

app.post("/fileName", (req, res, next) => {
    try {
        figureFileName = req.body.title;
        console.log(figureFileName);
        res.redirect('/api/');

    } catch (e) {
        console.log(e);
        res.redirect('/');
    }

});

async function start() {
    try {
        await mongoose.connect("mongodb+srv://Yaroslav:12345678qw@cluster0.7a7ns.mongodb.net/test_job2?retryWrites=true&w=majority")
        app.listen(3000, () => {
            console.log("Server started");
        })
    } catch (e) {
        console.log(e);
    }
}

start();