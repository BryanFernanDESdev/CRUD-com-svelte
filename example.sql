-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS tarefa_nova;

-- Usar o banco de dados
USE tarefa_nova;

-- Criar a tabela tarefas
CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status ENUM('pendente', 'concluida') DEFAULT 'pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Coluna createdAt
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Coluna updatedAt
);

-- Verificar as tabelas
SHOW TABLES;
select*from tarefas;
-- Descrição da tabela
DESCRIBE tarefas;
