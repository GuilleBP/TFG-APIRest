const express = require('express');
const { generateAccessToken, validateToken } = require('./controllers/tokenController.js');
const app = express()
const port = 8000
require('dotenv').config();


var proyect = require('./routers/proyectRouter.js');
app.use('/proyect', proyect);

app.get('/', (req, res) => {
  res.send('API for TFG')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

