const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://127.0.0.1:3000', // Permitir requisições do Live Server
  methods: ['GET', 'POST'], // Permitir apenas os métodos necessários
  allowedHeaders: ['Content-Type'] // Permitir cabeçalhos específicos
}));


var data = [0, 0, 0, 0, 0];
app.use(express.json());


// Rota para receber dados do ESP32
app.post('/data', (req, res) => {
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
  var d = { valor: data };
  res.json(d);
});
module.exports = app;

