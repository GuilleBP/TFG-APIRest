const express = require("express");
// const cors = require('cors');
const {
  generateAccessToken,
  validateToken,
} = require("./controllers/tokenController.js");
var proyect = require("./routers/proyectRouter.js");
var bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 8000;

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatusº: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods","*")
  next();
});
app.use("/proyect", proyect);
// app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("API for TFG");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
