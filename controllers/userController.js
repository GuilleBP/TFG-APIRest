

const login = async (req, res = response) => {
  const { email, password } = req.body;
  // Ideally search the user in a database and validate password, throw an error if not found.
  const user = getUserFromDB({ email, password });

  if (user) {
    const token = generateAccessToken(user?.username);
    res.json({
      token: `Bearer ${token}`,
    });
  } else res.sendStatus(401);
};
