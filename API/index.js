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
if(sensorData.sensorValue <2300){
  sensorData.sensorValue-=200;
}
  data.push(parseInt((100-(sensorData.sensorValue/4095)*100)));
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