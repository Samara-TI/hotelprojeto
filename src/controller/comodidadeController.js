const db = require('../db/db'); // Módulo de conexao com o banco de dados
 
const Joi = require('joi'); //biblioteca de validacao de dados
 
 
 
//validacao com joi
const ComodidadeSchema = Joi.object({
    id_Comodidade: Joi.string().required(),
   nome_Comodidade: Joi.string().required().max(50),
    tipo_Quarto: Joi.string().required().max(50),
    preço_Comodidade:Joi.string().required()
});
 
exports.listarComodidade = async (req, res) => {
    try {
        const [result] = await db.query('Select * From comodidade');
        res.json(result);//aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar comodidade:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
//buscar cliente por cpf
exports.listarIdComodidade = async (req, res) => {
    const { id_Comodidade } = req.params;
    try {
        const [result] = await db.query("Select * From quarto WHERE id_Comodidade= ?", [id_Comodidade]);
        if (result.length === 0) {
            return res.status(404).json({ erro:'Comodidade não encontrado'});
 
        }
        res.json(result[0]);
    }catch(err){
        console.error('erro ao buscar Comodidade:',err);
        res.status(500).json({error:'Erro interno do servidor'})
    }
};
 
exports.deletarComodidade= async (req,res) => {
    const{id_Comodidade} = req.params;
    try{
        await db.query('DELETE * FROM comodidade WHERE id_Comodidade = ?',[id_Comodidade]);
        res.json({message:'Comodidade deletada com  sucesso'});
    }catch(err){
        console.error('Erro ao deletar Comodidade:',err);
        res.status(500).json({error:'Erro ao deletar Comodidade'})
    }
};