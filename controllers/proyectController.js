async function getAll (){
    var json = {}
    const neode = require('neode')
    .fromEnv()
    .with({
        Proyect: require("../models/proyectModel"),
    });
    await neode.all('Proyect')
    .then(async (proyect) => {
        json = await proyect.toJson()
    }).catch(e => {
        res.status(500).send(e.getMessage());
    });
    return json;
}

async function getByID (id){
    var json = {}
    const neode = require('neode')
    .fromEnv()
    .with({
        Proyect: require("../models/proyectModel"),
    });
    await neode.find('Proyect',id)
    .then(async (proyect) => {
        json = await proyect.toJson()
    }).catch(e => {
        res.status(500).send(e.getMessage());
    });
    return json;
}

async function create (name){
    var success = false
    const neode = require('neode')
    .fromEnv()
    .with({
        Proyect: require("../models/proyectModel"),
    });
    await neode.create('Proyect', {
        name: name
    })
    .then(proyect => {
        success = true
    }).catch(e => {
        res.status(500).send(e.getMessage());
    });
    return success;
}

async function remove (id){
    const neode = require('neode')
    .fromEnv()
    .with({
        Proyect: require("../models/proyectModel"),
    });
    neode.find('Proyect', {id: `${id}`})
    .then(proyect => proyect.delete())
    .catch(e => {
        res.status(500).send(e.getMessage());
    });
}

async function update (id,data){
    var json = {}
    const date = Date.now();
    const neode = require('neode')
    .fromEnv()
    .with({
        Proyect: require("../models/proyectModel"),
    });
    await (await (await neode.find('Proyect',id)).update(data)).update({updated_at: date})
    .then(async (proyect) => {
        json = await proyect.toJson()
    }).catch(e => {
        res.status(500).send(e.getMessage());
    });
    return json;
}

module.exports = {
    getAll:getAll,
    getByID:getByID,
    create:create,
    update:update,
    remove:remove
}