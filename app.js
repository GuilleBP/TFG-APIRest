const express = require("express");
const {
  generateAccessToken,
  validateToken,
} = require("./controllers/tokenController.js");
let proyect = require("./routers/proyectRouter.js");
let user = require("./routers/userRouter.js");
let keyword = require("./routers/keywordRouter.js");
let bodyParser = require("body-parser");
require("dotenv").config();
const apiRest = express();
const port = 8000;

apiRest.use(bodyParser.json());
apiRest.use(bodyParser.urlencoded({ extended: true }));
apiRest.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods","*")
  res.header("Access-Control-Allow-Headers","*")
  next();
});

apiRest.use("/proyect", proyect);
apiRest.use("/user", user);
apiRest.use("/keyword", keyword);

apiRest.get("/", (req, res) => {
  res.send("API for TFG");
});

apiRest.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
