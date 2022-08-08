let express = require("express");
let router = express.Router();
let controller = require("../controllers/userController.js");

router.post("/register", async (req, res) => {
    let result = await controller.register(req.body["data"]);
    res.send(result);
});

router.post("/login", async (req, res) => {
    let result = await controller.login(req, res);
    res.send(result);
});

module.exports = router;