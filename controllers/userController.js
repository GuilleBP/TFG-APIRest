const bcrypt = require("bcrypt");
const generateAccessToken = require("./tokenController");
const neode = require("neode")
  .fromEnv()
  .with({
    Proyect: require("../models/proyectModel"),
    User: require("../models/userModel"),
  });

const login = async (req, res = response) => {
  const { username, pass } = req.body;
  let user = false;

  await neode.all("User", { username: username }).then(async (collection) => {
    if (collection.length !== 0) {
      user = await bcrypt.compare(pass, collection.get(0).get("pass"));
    }
  });

  if (user) {
    const token = generateAccessToken.generateAccessToken(user?.username);
    res.json({
      token: `Bearer ${token}`,
    });
  } else res.sendStatus(401);
};

const register = async (data) => {
  let value = false;
  const new_pass = await bcrypt.hash(data.pass, 10);
  await neode
    .all("User", { username: data.username })
    .then(async (collection) => {
      if (collection.length === 0) {
        await neode
          .create("User", {
            username: data.username,
            name: data.name,
            pass: new_pass,
            email: data.email,
          })
          .then((user) => {})
          .catch((e) => {
            // console.log(e);
            // res.status(500).send(e.getMessage());
          });
        value = true;
      } else {
        value = false;
      }
    });
  return value;
};

module.exports = {
  login: login,
  register: register,
};
