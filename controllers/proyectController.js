const neode = require("neode")
  .fromEnv()
  .with({
    Proyect: require("../models/proyectModel"),
  });

const neodeUser = require("neode")
  .fromEnv()
  .with({
    User: require("../models/userModel"),
  });

async function getAll() {
  let json = {};

  await (
    await neode.all("Proyect")
  ).find;

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

async function create(name, username) {
  let success = false;
  try {
    Promise.all([
      neode.create("Proyect", { name: name }),
      neodeUser.first("User", { username: username }),
    ]).then(([adam, joe]) => {
      joe.relateTo(adam, "have").then((res) => {
      });
    });
  } catch (error) {
    console.log(error);
  }
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
