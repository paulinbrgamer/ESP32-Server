const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


var data = [];
app.use(express.json());


// Rota para receber dados do ESP32
app.post('/data', (req, res) => {
  const sensorData = req.body;
  if (data.length == 10) {
    data.shift();
  }

  data.push(((sensorData.sensorValue*-1/4095)*100)-100);
  console.log("Dados recebidos do ESP32:", sensorData);

  // Responde com uma mensagem de sucesso
  res.status(200).send({ message: "Dados recebidos com sucesso!" });
});

// Rota para enviar os dados
app.get('/getData', (req, res) => {
  var d = { valor: data };
  res.status(200).json(d);
});
app.listen(process.env.PORT||3000)