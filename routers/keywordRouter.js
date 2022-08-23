let express = require("express");
let router = express.Router();
let controller = require("../controllers/keywordController.js");
let { validateToken } = require("../controllers/tokenController");

router.all("*", [validateToken]);

//GETALL
router.get("/keyword/:proyect", async (req, res) => {
  let result = await controller.getAll(req.params.proyect);
  res.send(result);
});

//CREATE
router.post("/keyword", async (req, res) => {
  let result = await controller.create(req.body["data"]);
  res.send('asd');
});

module.exports = router;