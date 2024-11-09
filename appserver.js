const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(cors());
var data = [0,0,0,0,0]
app.use(express.json());

// Rota para receber dados do ESP32
app.post('/data', (req, res) => {
  const sensorData = req.body;
  if(data.length ==5){
    data.shift()
  }
  data.push(sensorData.sensorValue);
  console.log("Dados recebidos do ESP32:", sensorData);
  
  // Responde com uma mensagem de sucesso
  res.status(200).send({ message: "Dados recebidos com sucesso!" });
});

app.get('/getData',(req,res)=>{
  var d = {valor:data}
  res.json(d)
})
// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
