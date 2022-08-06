let express = require("express");
let router = express.Router();
let controller = require("../controllers/keywordController.js");
let { validateToken } = require("../controllers/tokenController");

// router.all("*", [validateToken]);

//GET ALL
router.get("/keyword", async (req, res) => {
  let result = await controller.getAll();
  res.send(result);
});

//GET BY ID
router.get("/keywordid", async (req, res) => {
  //'e7a9d4a8-1df6-4f91-a679-750ab84d6aa3'
  let result = await controller.getByID("e7a9d4a8-1df6-4f91-a679-750ab84d6aa3");
  res.send(result);
});

//CREATE
router.post("/createkeyword", async (req, res) => {
  let result = await controller.create(req.body["data"]);
  res.send(result);
});

//DELETE
router.delete("/deletekeyword/:id", async (req, res) => {
    const result = await controller.remove(
      req.params.id.toString().replaceAll('"', "")
    );
    res.send('ok')
});

//UPDATE
router.get("/updatekeyword", async (req, res) => {
  let id = "3d2053ee-b11e-4f3d-b8dd-1bc4fe2e4c0a";
  let data = { name: "keyword actualizada" };
  let result = await controller.update(id, data);
  res.send("update");
});
module.exports = router;