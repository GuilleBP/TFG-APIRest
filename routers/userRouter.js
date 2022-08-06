var express = require("express");
var router = express.Router();
var controller = require("../controllers/userController.js");
var { validateToken } = require("../controllers/tokenController");

router.post("/register", async (req, res) => {
    var result = await controller.register(req.body["data"]);
    res.send(result);
});

router.post("/login", async (req, res) => {
    var result = await controller.login(req, res);
    res.send(result);
});

module.exports = router;