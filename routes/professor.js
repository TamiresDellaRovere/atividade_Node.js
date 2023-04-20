const Professor = require("../database/professor");
const {Router} = require("express");
const router = Router();
const { Op } = require("sequelize");



//INICIO ROTAS PROFESSOR

// listar todos os professores;
router.get("/professores", async (req, res) => {
    const listarProfessores = await Professor.findAll();
    res.json(listarProfessores);
});

// listar professor por nome;
router.get("/professores/:nome", async (req, res) => {
    try {
        const professor = await Professor.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.params.nome}%`
                }
            },
            order: [
                ['nome', 'ASC']
            ]
        })
        if(professor.length > 0){
            res.status(200).json(professor);
        } else {
            res.status(404).json({ message: "Nenhum professor encontrado."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// inserir professor;
router.post("/professores", async (req, res) => {
    const { nome, telefone, email } = req.body;
    try {
        const novoProfessor = await Professor.create(
            { nome, telefone, email }
        );
        res.status(201).json(novoProfessor);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

// atualizar professor;
router.put("/professores/:id", async(req, res) => {
    const { nome, telefone, email } = req.body;
    const atualizarProfessor = await Professor.findByPk(req.params.id)
    try{
        if(atualizarProfessor){
            await atualizarProfessor.update({ nome, telefone, email })
            res.json({ message: "O professor foi editado." });
        }else{
            res.status(404).json({ message: "O professor não foi encontrado." })
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

//deletar professor;
router.delete("/professores/:id", async (req,res) => {
    const deletarProfessor = await Professor.findByPk(req.params.id);
    try{
        if(deletarProfessor){
            await deletarProfessor.destroy();
            res.status(200).json({ message: "Professor excluido com sucesso." })
        }else{
            res.status(404).json({ message: "Professor não encontrado." })
        }
    }catch{
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});


//FIM ROTAS PROFESSORES



module.exports = router;