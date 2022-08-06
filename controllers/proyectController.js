const neode = require("neode")
  .fromEnv()
  .with({
    Proyect: require("../models/proyectModel"),
  });

async function getAll() {
  let json = {};
  await neode
    .all("Proyect")
    .then(async (proyect) => {
      json = await proyect.toJson();
    })
    .catch((e) => {
      // res.status(500).send(e.getMessage());
    });
  return json;
}

async function getByID(id) {
  let json = {};
  await neode
    .find("Proyect", id)
    .then(async (proyect) => {
      json = await proyect.toJson();
    })
    .catch((e) => {
      // res.status(500).send(e.getMessage());
    });
  return json;
}

async function create(name) {
  let success = false;
  await neode
    .create("Proyect", {
      name: name,
    })
    .then((proyect) => {
      success = true;
    })
    .catch((e) => {
      succes = false;
      // res.status(500).send(e.getMessage());
    });
  return success;
}

async function remove(data) {
  neode
    .find("Proyect", data)
    .then((proyect) => {
      proyect.delete();
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

async function update(id, data) {
  let json = {};
  const date = Date.now();
  await (
    await (await neode.find("Proyect", id)).update(data)
  )
    .update({ updated_at: date })
    .then(async (proyect) => {
      json = await proyect.toJson();
    })
    .catch((e) => {
      // res.status(500).send(e.getMessage());
    });
  return json;
}

module.exports = {
  getAll: getAll,
  getByID: getByID,
  create: create,
  update: update,
  remove: remove,
};
