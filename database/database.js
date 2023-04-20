//importando a biblioteca que permite a conexão;
const {Sequelize} = require("sequelize");


const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);


async function autenticacao(connection){
    try{
        await connection.authenticate();
        console.log("conexão estabelecida com sucesso")
    } catch (err){
        console.log("Um erro inesperado acontece", err);
    }
}


module.exports = {connection, autenticacao};
