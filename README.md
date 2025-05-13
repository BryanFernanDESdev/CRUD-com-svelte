# Gerenciador de Tarefas 📝

Bem-vindo ao **Gerenciador de Tarefas**, um projeto completo para gerenciar suas tarefas diárias. Este projeto foi desenvolvido utilizando tecnologias modernas no frontend e backend, com um banco de dados relacional para persistência.

---

## 🚀 Funcionalidades

- ✅ Adicionar novas tarefas.
- 🕒 Marcar tarefas como concluídas.
- ❌ Excluir tarefas.
- 📋 Listar todas as tarefas.
- 🔔 Notificações visuais para ações realizadas.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- [Svelte](https://svelte.dev) - Framework para construção de interfaces reativas.
- [Tailwind CSS](https://tailwindcss.com) - Framework utilitário para estilização.
- [Vite](https://vitejs.dev) - Ferramenta de build rápida para desenvolvimento frontend.

### **Backend**
- [Node.js](https://nodejs.org) - Ambiente de execução JavaScript no servidor.
- [Express](https://expressjs.com) - Framework minimalista para criação de APIs.
- [Sequelize](https://sequelize.org) - ORM para interação com o banco de dados.

### **Banco de Dados**
- [MySQL](https://www.mysql.com) - Banco de dados relacional para armazenamento das tarefas.

### **Outras Ferramentas**
- [Git](https://git-scm.com) - Controle de versão.
- [GitHub](https://github.com) - Hospedagem do repositório remoto.
- [Postman](https://www.postman.com) - Testes de API.
- [VS Code](https://code.visualstudio.com) - Editor de código.

---

## 📂 Estrutura do Projeto
tarefa_nova/ ├── backend/ │ ├── config/ │ ├── migrations/ │ ├── models/ │ ├── seeders/ │ ├── example.sql │ └── server.js ├── frontend/ │ ├── src/ │ │ ├── routes/ │ │ │ └── +page.svelte │ ├── package.json │ ├── svelte.config.js │ └── vite.config.ts └── README.md


---

## ⚙️ Configuração do Projeto

### **1. Clonar o Repositório**
```bash
git clone https://github.com/BryanFernanDESdev/gerenciador-de-tarefas.git
cd gerenciador-de-tarefas
2. Configurar o Banco de Dados
Certifique-se de que o MySQL está instalado e rodando na sua máquina.
Execute o arquivo example.sql para criar o banco de dados e a tabela necessária:
mysql -u root -p < backend/example.sql
Atualize o arquivo backend/config/config.json com as credenciais do seu banco de dados, se necessário.
3. Instalar Dependências
Backend:
cd backend
npm install
cd frontend
npm install
4. Rodar o Projeto
Backend:
cd backend
npm start
Frontend:
cd frontend
npm run dev
👨‍💻 Desenvolvedor
Bryan Fernandes
GitHub: BryanFernanDESdev
E-mail: bryanfernandesse@gmail.com
📜 Licença
Este projeto está licenciado sob a MIT License.

