//para colocar no GIT usar dotenv para não compartilhar informaçãoes sensíveis
//Sempre que eu precisar usar um dado senível, adiciono ao .env
require("dotenv").config();
//configuração inicial
//Importando o express
const express = require("express");
const mongoose = require("mongoose");
//Dessa forma eu deixo varáiveis de ambiente mais seguras
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

//iniciando o express
const app = express();

//criar uma forma de ler o JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//rota inicial
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo ao meu projeto!" });
});

//entregar uma porta para o servidor

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterprojetobit.f4wrkhr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterProjetoBit`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => console.log(err));
