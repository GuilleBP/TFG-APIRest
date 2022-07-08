var express = require('express');
const path = require('path');
var router = express.Router();
var model = require('../models/proyectModel.js');
var controller = require('../controllers/proyectController.js');
var{validateToken} = require('../controllers/tokenController')

router.all("*", [validateToken]);

//GET ALL
router.get('/proyect', async (req,res) => {
    var result = await controller.getAll();
    console.log(result);
    res.send(result)
})

//GET BY ID
router.get('/proyectid', async (req,res) => {
    //'e7a9d4a8-1df6-4f91-a679-750ab84d6aa3'
    var result = await controller.getByID('e7a9d4a8-1df6-4f91-a679-750ab84d6aa3');
    console.log(result);
    res.send(result)
})

//CREATE
router.get('/createproyect', async (req,res) => {
    var result = await controller.create('proyecto 123');
    console.log(result);
    res.send(result)
})

//DELETE
router.get('/deleteproyect', (req,res) => {
    var id = '123'
    await controller.remove(id);
    res.send('create')
})

//UPDATE
router.get('/updateproyect', async (req,res) => {
    var id = '3d2053ee-b11e-4f3d-b8dd-1bc4fe2e4c0a';
    var data = {name: 'proyecto actualizado'}
    var result = await controller.update(id,data);
    res.send('update') 
})
module.exports = router;