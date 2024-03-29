//Importações principais e variáveis de ambiente;
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")

//Configuração do App;
const app = express()
app.use(express.json());

//Configuração do Banco de Dados;
const { connection, autenticacao } = require("./database/database");
autenticacao(connection);

//Definição de rotas;
const rotasTurmas = require("./routes/turmas");
const rotasAlunos = require("./routes/alunos");
const rotasProfessores = require("./routes/professor");
app.use(rotasTurmas);
app.use(rotasAlunos);
app.use(rotasProfessores);


app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs))



//Escuta de eventos (listen);
app.listen(3000, () => {
    connection.sync({ force: true })
    console.log("Servidor rodando em http://localhost:3000")
});