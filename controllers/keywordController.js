const neode = require("neode")
  .fromEnv()
  .with({
    Proyect: require("../models/proyectModel"),
    Keyword: require("../models/keywordModel"),
    Document: require("../models/documentModel"),
  });

async function getAll(id) {
  let json = {};
  await neode
    .cypher(
      `match (p:Proyect)-[:CONTAIN]->(d:Document)-[:GOT]->(k:Keyword) where p.id = $id return k`,
      { id: id }
    )
    .then(async (Keyword) => {
      json = await neode.hydrate(Keyword, 'k').toJson()
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

async function create(data) {
  try {
    Promise.all([
      neode.first("Proyect", { id: data["proyectId"] }),
      neode.create("Document", { text: data["text"] }),
    ]).then(async ([proyect, document]) => {
      await proyect.relateTo(document, "contain").then((res) => {});
      for (var json in data["keyword"]) {
        Promise.all([
          neode.first("Document", { id: document.get('id') }),
          neode.create("Keyword", { word: data['keyword'][json] }),
        ]).then(async ([document, keyword]) => {
          await document.relateTo(keyword, "got").then((res) => {});
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
  return false;
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
