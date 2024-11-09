const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

var data = [0, 0, 0, 0, 0];
app.use(express.json());

// Rota para receber dados do ESP32
app.post('/data', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permitir qualquer origem
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
  const sensorData = req.body;
  if (data.length == 5) {
    data.shift();
  }
  data.push(sensorData.sensorValue);
  console.log("Dados recebidos do ESP32:", sensorData);

  // Responde com uma mensagem de sucesso
  res.status(200).send({ message: "Dados recebidos com sucesso!" });
});

// Rota para enviar os dados
app.get('/getData', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permitir qualquer origem
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
  var d = { valor: data };
  res.json(d);
});
module.exports = app;

