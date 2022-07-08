var express = require("express");
var router = express.Router();
var controller = require("../controllers/proyectController.js");
var { validateToken } = require("../controllers/tokenController");

// router.all("*", [validateToken]);

//GET ALL
router.get("/proyect", async (req, res) => {
  var result = await controller.getAll();
  res.send(result);
});

//GET BY ID
router.get("/proyectid", async (req, res) => {
  //'e7a9d4a8-1df6-4f91-a679-750ab84d6aa3'
  var result = await controller.getByID("e7a9d4a8-1df6-4f91-a679-750ab84d6aa3");
  res.send(result);
});

//CREATE
router.post("/createproyect", async (req, res) => {
  var result = await controller.create(req.body["data"]);
  res.send(result);
});

//DELETE
router.delete("/deleteproyect/:id", async (req, res) => {
    const result = await controller.remove(
      req.params.id.toString().replaceAll('"', "")
    );
    res.send('ok')
});

//UPDATE
router.get("/updateproyect", async (req, res) => {
  var id = "3d2053ee-b11e-4f3d-b8dd-1bc4fe2e4c0a";
  var data = { name: "proyecto actualizado" };
  var result = await controller.update(id, data);
  res.send("update");
});
module.exports = router;
