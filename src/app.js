const express = require("express");
const {engine} = require("express-handlebars");
const myconnection = require("express-myconnection");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const tasksRoutes = require("./routers/tasks")
const config = require("./config");

// Crear app de express
const app = express();
app.set("port", config.PORT);

// LLamando al body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(myconnection(mysql,{
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    database: config.DB_NAME
}, "single"));

// Donde cargar los archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


// Habilitar hbs
app.set("views",__dirname + "/views");

app.engine(".hbs", engine({
    extname: ".hbs"
}));
app.set("view engine", "hbs");

app.listen(app.get("port"), ()=>{
    console.log("Listening on port ", app.get("port"));
})

//Definiendo la ruta 
app.use("/", tasksRoutes);

// Definiendo la ruta

app.get("/", (req, res)=>{
    res.render("home");
})