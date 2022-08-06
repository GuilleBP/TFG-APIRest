const bcrypt = require("bcrypt");
const generateAccessToken = require("./tokenController")
const neode = require("neode")
  .fromEnv()
  .with({
    User: require("../models/userModel"),
  });

const login = async (req, res = response) => {
  const { username, pass } = req.body;
  let user = false;
  // Ideally search the user in a database and validate password, throw an error if not found.
  await neode
    .cypher("MATCH (p:User {username: $username}) RETURN p", {
      username: username,
    })
    .then(async (res) => {
      if(res.records.length !== 0)
        user = true;
    });

  // const user = getUserFromDB({ email, password });

  if (user) {
    const token = generateAccessToken.generateAccessToken(user?.username);
    res.json({
      token: `Bearer ${token}`,
    });
  } else res.sendStatus(401);
};

// const result = await bcrypt.compare('textoplano', 'hash guardado en la bd');

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
