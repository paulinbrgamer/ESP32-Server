const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


var data = [];
var dataUmidadeDoAr = []
var dataTempDoAr = []
app.use(express.json());

// Rota para receber dados do Arduino

// Rota para receber dados do ESP32
app.post('/data', (req, res) => {
  const sensorData = req.body;
  if (data.length == 10) {
    data.shift();
  } 
  if (dataUmidadeDoAr.length == 10) {
    dataUmidadeDoAr.shift();
  }
  if (dataTempDoAr.length == 10) {
    dataTempDoAr.shift();
  } 

  dataUmidadeDoAr.push(sensorData.umidAr)
  dataTempDoAr.push(sensorData.tempAr)
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
app.get('/getData2',(req,res)=>{
  var d2 = {tempAr:dataTempDoAr,umidAr:dataUmidadeDoAr}
  res.status(200).json(d2);
})
app.listen(process.env.PORT||3000)