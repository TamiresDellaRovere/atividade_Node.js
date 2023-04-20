const Aluno = require("../database/aluno");
const {Router} = require("express");
const router = Router();
const { Op } = require("sequelize");
const Turma = require("../database/turma");


//INICIO ROTAS ALUNOS

// listar todos os alunos;
router.get("/alunos", async (req, res) => {
    const listarAlunos = await Aluno.findAll();
    res.json(listarAlunos);
});

// listar aluno por nome;
router.get("/alunos/:nome", async (req, res) => {
    try {
        const alunos = await Aluno.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.params.nome}%`
                }
            },
            order: [
                ['nome', 'ASC']
            ]
        })
        if(alunos.length > 0){
            res.status(200).json(alunos);
        } else {
            res.status(404).json({ message: "Nenhum aluno encontrado."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// inserir alunos;
router.post("/alunos", async (req, res) => {
    const { nome, telefone, email, matricula, data_ingressao, turmaId } = req.body;
    try {
        const turmaAluno = await Turma.findByPk( turmaId );
        if (turmaAluno){
            const novoAluno = await Aluno.create(
                { nome, telefone, email, matricula, data_ingressao, turmaId });
                const resposta = {
                    novoAluno,
                    turmaAluno
                };
                res.status(201).json(resposta);
        } else {
            res.status(404).json({ message: "Turma não encontrada." });
        }        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

// atualizar aluno;
router.put("/alunos/:id", async(req, res) => {
    const { nome, telefone, email, matricula, data_ingressao } = req.body;
    const atualizarAluno = await Aluno.findByPk(req.params.id)
    try{
        if(atualizarAluno){
            await atualizarAluno.update({ nome, telefone, email, matricula, data_ingressao })
            res.json({ message: "O aluno foi editado." });
        }else{
            res.status(404).json({ message: "O aluno não foi encontrado." })
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

//deletar aluno;
router.delete("/alunos/:id", async (req,res) => {
    const deletarAluno = await Aluno.findByPk(req.params.id);
    try{
        if(deletarAluno){
            await deletarAluno.destroy();
            res.status(200).json({ message: "Aluno excluido com sucesso." })
        }else{
            res.status(404).json({ message: "Aluno não encontrado." })
        }
    }catch{
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});


//FIM ROTAS ALUNOS

module.exports = router;