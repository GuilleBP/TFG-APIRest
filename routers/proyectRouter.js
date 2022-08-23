let express = require("express");
let router = express.Router();
let controller = require("../controllers/proyectController.js");
let { validateToken } = require("../controllers/tokenController");
let levenshtein = require('damerau-levenshtein')

router.all("*", [validateToken]);

//GET ALL
router.get("/proyect/:user", async (req, res) => {
  let result = await controller.getAll(req.params.user);
  res.send(result);
});

router.get("/damerou", async (req, res) => {
  const lev = levenshtein('neuronal network', 'artificial intelligence');
  res.send(lev);
});

//GET BY ID
router.get("/proyectid/:id", async (req, res) => {
  let result = await controller.getByID(req.params.id);
  res.send(result);
});

//CREATE
router.post("/createproyect/:user", async (req, res) => {
  try {
    let result = await controller.create(req.body["data"], req.params.user);
    res.send(result);
  } catch (error) {
    res.sendStatus(500).send("Fallo al crear el proyecto");
  }
});

//DELETE
router.delete("/deleteproyect/:id", async (req, res) => {
  const result = await controller.remove(
    req.params.id.toString().replaceAll('"', "")
  );
  res.send("ok");
});

//UPDATE
router.get("/updateproyect", async (req, res) => {
  let id = "3d2053ee-b11e-4f3d-b8dd-1bc4fe2e4c0a";
  let data = { name: "proyecto actualizado" };
  let result = await controller.update(id, data);
  res.send("update");
});
module.exports = router;
