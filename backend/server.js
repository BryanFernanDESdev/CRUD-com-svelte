const express = require('express');
const cors = require('cors'); // Importa o CORS
const app = express();
const port = 3000;
const { Tarefa } = require('./models');

app.use(cors()); // Habilita o CORS
app.use(express.json()); // Para lidar com JSON no corpo das requisições

// Rota para a raiz
app.get('/', (req, res) => {
  res.send('Servidor rodando! Use /tarefas para acessar as tarefas.');
});

// Outras rotas...

// Rota para listar tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar tarefa
app.post('/tarefas', async (req, res) => {
  const { titulo, descricao, status } = req.body;
  
  try {
    const tarefa = await Tarefa.create({
      titulo,
      descricao,
      status,
    });
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar tarefa
app.put('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const tarefa = await Tarefa.findByPk(id);
    
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tarefa.status = status;
    await tarefa.save();
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar tarefa
app.delete('/tarefas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await tarefa.destroy();
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});