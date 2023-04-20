const {DataTypes} = require("sequelize");
const {connection} = require ("./database");
const Aluno = require("./aluno");


const Turma = connection.define("turma", {
    ensino: { // ensino: basico, fundamental, médio;
        type: DataTypes.STRING,
        allowNull: false,
    },
    periodo: { // matutino, vespertino, noturno
        type: DataTypes.STRING,
        allowNull: false,
    },
    serie: { //1ªserie/1ºano, 2ªserie/2ºano, 1ºColegial...;
        type: DataTypes.STRING,
        allowNull: false,
    },
    turma: { // A, B, C;
        type: DataTypes.STRING,
        allowNull: false,
    },
    ano: { // Ano da turma; 
        type: DataTypes.STRING(4),
        allowNull: false,
    },
    sala_aula: { //numero da sala de aula;
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Turma.hasMany(Aluno);
Aluno.belongsTo(Turma);

module.exports = Turma;