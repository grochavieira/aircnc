// É um framework com funcionalidade prontas, como criar rotas (porta)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express();

// Pega o servidor e extrai ele do express
const server = http.Server(app);

// O server também consegue ouvir agora o io
const io = socketio(server);

// Não é boa para uma aplicação de verdade, pois ela sempre
// vai reinicar quando o banco sair do ar, o redis é bom pra fazer
// isso, mas da pra fazer com o mongo tambem
const connectedUsers = {};

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@aircnc-hrlm8.mongodb.net/semana09?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Ouve todo o usuário que foi logado na aplicação e anota a informação
// em algum lugar
io.on("connection", socket => {
  // Pega o user_id do socket sempre que um usuário logar
  const { user_id } = socket.handshake.query;

  // Relaciona o id de usuário com o id de conexão
  connectedUsers[user_id] = socket.id;

  // Emite uma mensagem no websockets em 4 segundos
  // setTimeout(() => {
  //   socket.emit("hello", "World");
  // }, 4000);
});

// Ele vai mandar a relação do usuário com o socket para todas as rotas
// o next é essencial para que isso dê certo
app.use((req, res, next) => {
  // O io será usado para mandar e enviar mensagens
  req.io = io;

  // Manda para as rotas os usuários conectados
  req.connectedUsers = connectedUsers;

  // Para continuar o fluxo da aplicação, se não tiver isso ele para aqui mesmo
  return next();
});

// req.query = acessar query params para filtros
// req.params = acessar route params para edição e delete
// req.body = acessar corpo da requisição para criação e edição de registros

// Permiti que qualquer aplicação acesse a api
app.use(cors());
app.use(express.json());

// Lida com caminhos da aplicação, quando o user
// acessa o /files, o express.static retorna
// arquivos
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);
// Chama a porta, com requisições http e websocket
server.listen(3333);
