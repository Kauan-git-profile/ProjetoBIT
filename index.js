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

const Person = require("./models/Person");

//criar uma forma de ler o JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//rotas da API
//a função async permite que eu use o await dentro dela
app.post("/person", async (req, res) => {
  //req.body vem do JSON que foi enviado
  const { name, salary, approved } = req.body;

  //criando uma pessoa
  const person = {
    name,
    salary,
    approved,
  };

  //Método create do mongoose
  //ele cria uma nova pessoa no banco de dados
  //await é usado para esperar a resposta do banco de dados
  //se não usar o await, o código continua executando sem esperar a resposta
  //e pode dar erro
  //try/catch é usado para tratar erros
  //se der erro, o código não vai quebrar, e sim retornar um erro
  //se der certo, o código continua executando normalmente
  try {
    //criando a pessoa no banco de dados
    await Person.create(person);

    res.status(201).json({ message: "Pessoa inserida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

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
