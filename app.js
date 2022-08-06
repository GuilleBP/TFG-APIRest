const express = require("express");
const {
  generateAccessToken,
  validateToken,
} = require("./controllers/tokenController.js");
var proyect = require("./routers/proyectRouter.js");
var user = require("./routers/userRouter.js");
var bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods","*")
  res.header("Access-Control-Allow-Headers","Authorization")
  next();
});

app.use("/proyect", proyect);
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("API for TFG");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
