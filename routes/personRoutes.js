const router = require("express").Router();
const Person = require("../models/Person");

//rotas da API
//a função async permite que eu use o await dentro dela

//create - criação de dados
router.post("/", async (req, res) => {
  //req.body vem do JSON que foi enviado
  const { name, salary, approved } = req.body;

  if (!name) {
    return res.status(422).json({ error: "O nome é obrigatório!" });
  }

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

//read - leitura de dados
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  // Extrair o dado da requisição, pela URL = req.params.id
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//exportando o router

//update - atualização de dados
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//delete - deletar dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: "Usuário não encontrado!" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;

//rota para buscar todas as pessoas
