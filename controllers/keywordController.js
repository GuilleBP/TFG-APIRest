const neode = require("neode")
  .fromEnv()
  .with({
    Keyword: require("../models/keywordModel"),
  });

async function getAll() {
  let json = {};
  await neode
    .all("Keyword")
    .then(async (Keyword) => {
      json = await Keyword.toJson();
    })
    .catch((e) => {
      // res.status(500).send(e.getMessage());
    });
  return json;
}

async function getByID(id) {
  let json = {};
  await neode
    .find("Keyword", id)
    .then(async (Keyword) => {
      json = await Keyword.toJson();
    })
    .catch((e) => {
      // res.status(500).send(e.getMessage());
    });
  return json;
}

async function create(name) {
  let success = false;
  await neode
    .create("Keyword", {
      name: name,
    })
    .then((Keyword) => {
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
    .find("Keyword", data)
    .then((Keyword) => {
        Keyword.delete();
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
    await (await neode.find("Keyword", id)).update(data)
  )
    .update({ updated_at: date })
    .then(async (Keyword) => {
      json = await Keyword.toJson();
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
