const router = require("express").Router();
const Task = require("../models/Task");

//rotas da API
//a função async permite que eu use o await dentro dela

//create - criação de dados
router.post("/", async (req, res) => {
  //req.body vem do JSON que foi enviado
  const { title, description, completed, priority, dueDate } = req.body;

  if (!title) {
    return res.status(422).json({ error: "O nome é obrigatório!" });
  }

  if (completed === undefined) {
    return res.status(422).json({ error: "O campo completed é obrigatório!" });
  }

  //criando uma pessoa
  const task = {
    title,
    description,
    completed: completed || false,
    priority: priority || 0,
    dueDate,
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
    //criando a tarefa no banco de dados
    await Task.create(task);

    res.status(201).json({ message: "Tarefa incluída!!!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//read - leitura de dados
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  // Extrair o dado da requisição, pela URL = req.params.id
  const id = req.params.id;

  try {
    const task = await Task.findOne({ _id: id });

    if (!task) {
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

  const { title, description, completed, priority, dueDate } = req.body;

  const task = {
    title,
    description,
    completed,
    priority,
    dueDate,
  };

  try {
    const updatedTask = await Task.updateOne({ _id: id }, task);

    if (updatedTask.matchedCount === 0) {
      res.status(422).json({ message: "Tarefa não encontrada!" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//delete - deletar dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const task = await Task.findOne({ _id: id });

  if (!task) {
    res.status(422).json({ message: "Tarefa não encontrada!" });
    return;
  }

  try {
    await Task.deleteOne({ _id: id });
    res.status(200).json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;

//rota para buscar todas as tarefas
