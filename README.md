![Logo do Projeto](https://i.imgur.com/DpUlnZM.jpeg)

# API de filmes do Harry Potter
## 🔥 Introdução
Este é um projeto de aplicação web de gerenciamento de filmes do universo Harry Potter, desenvolvido utilizando as seguintes tecnologias: TypeScript, React (com Vite), Node.js, Express e MongoDB. A aplicação permite aos usuários visualizar, cadastrar, editar e excluir filmes, além de reproduzir trailers dos filmes diretamente na interface.

### 🖥 Frontend:
No frontend, utilizei o React.js com TypeScript para criar uma interface de usuário intuitiva e responsiva. A aplicação permite aos usuários visualizar uma lista de filmes, cada um com título, descrição, imagem de capa e trailer. Eles também podem cadastrar novos filmes, editar informações existentes e excluir filmes da lista.

#### Principais características do frontend:

- Utilização de componentes funcionais e hooks do React com TypeScript para gerenciar o estado da aplicação e a interação com o usuário de forma tipada.</li>
- Integração com uma API RESTful desenvolvida no backend para realizar operações CRUD (Create, Read, Update, Delete) nos dados dos filmes.</li>
- Utilização de bibliotecas como axios para fazer requisições HTTP para a API e react-icons para adicionar ícones aos botões e elementos da interface.</li>


### 👩‍💻 Backend:
O backend foi desenvolvido utilizando Node.js e Express.js como framework web e MongoDB como banco de dados NoSQL para armazenar os dados dos filmes. A comunicação entre o frontend e o backend é feita através de uma API RESTful.

#### Principais características do backend:
- Utilização do Express.js para criar rotas que respondem a requisições HTTP feitas pelo frontend.
- Uso do mongoose para modelar e interagir com os dados do MongoDB de forma simplificada.
- Implementação de endpoints para as operações CRUD: criar, ler, atualizar e deletar filmes.
- Habilitação do CORS para permitir que o frontend faça requisições ao backend de um domínio diferente.


#### Funcionalidades:
1. Visualização da lista de filmes com título, descrição e imagem de capa.
2. Reprodução do trailer de cada filme incorporado na página.
3. Busca de filmes por título.
4. Cadastro de novos filmes com título, descrição, imagem de capa e URL do trailer.
5. Edição de informações de filmes existentes.
6. Exclusão de filmes da lista.

# 📖 Manual de Instalação e Utilização da Aplicação:

### ⚙ Pré-requisitos:
- Node.js e npm (Node Package Manager) instalados globalmente em seu sistema.
- Conexão com a internet para acessar o MongoDB Atlas (caso deseje utilizar um banco de dados remoto).

### Passo 1: Clonando o repositório</h3>
1. Abra o terminal ou prompt de comando.
2. Navegue até o diretório onde deseja clonar o repositório.
3. Execute o seguinte comando para clonar o repositório:
```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

### Passo 2: Instalando as dependências
1. Navegue até o diretório do projeto clonado.
2,.No diretório frontend, execute o seguinte comando para instalar as dependências do frontend:<br>
``` 
cd frontend
npm install
```
3. No diretório backend, execute o seguinte comando para instalar as dependências do backend:
```
cd backend
npm install
```
### Passo 3: Configurando o banco de dados (opcional)
O projeto está configurado para usar o MongoDB Atlas como banco de dados padrão. Se desejar utilizar um banco de dados local ou diferente, edite o arquivo backend/index.js e atualize a string de conexão do MongoDB.
### Passo 4: Iniciando o servidor
1. No diretório backend, execute o seguinte comando para iniciar o servidor:
```
node src/index.js
```
2. O servidor será iniciado na porta 3000 por padrão. Certifique-se de que a porta 3000 está disponível em seu sistema.
### Passo 5: Iniciando o frontend
1. No diretório frontend, execute o seguinte comando para iniciar o frontend:
```
npm run dev
```
O frontend será iniciado na porta 5173.

### 👾 Utilização da Aplicação:
- Na interface da aplicação, você verá uma lista de filmes do universo Harry Potter.
- Utilize a barra de busca para encontrar filmes específicos por título.
- Clique no botão "Cadastrar Filme" para adicionar um novo filme à lista. Preencha os campos obrigatórios e clique em "Cadastrar".
- Para editar um filme existente, clique no botão de edição (ícone de lápis) ao lado do filme desejado. Faça as alterações necessárias e clique em "Salvar Edição".
- Para excluir um filme, clique no botão de exclusão (ícone de lixeira) ao lado do filme desejado.
- Para reproduzir o trailer de um filme, clique no botão "Ver Trailer" ao lado do filme desejado. O trailer será exibido abaixo do filme.

### 📦 Tecnologias usadas
![Image](https://img.shields.io/badge/-React.js-0D1117?style=for-the-badge&logo=react&labelColor=0D1117)
![Image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Image](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![Image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Image](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![Image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Image](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

