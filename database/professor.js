const {DataTypes} = require("sequelize");
const {connection} = require ("./database");
const Turma = require("./turma");

const Professor = connection.define("professor", {
    nome: {
        type: DataTypes.STRING(180),
        allowNull: false,
    }, 
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});


Professor.hasOne(Turma);
Turma.belongsTo(Professor);

module.exports = Professor;
