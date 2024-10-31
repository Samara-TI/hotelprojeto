const db = require('../db/db'); // Módulo de conexao com o banco de dados
 
const Joi = require('joi'); //biblioteca de validacao de dados
 
 
 
//validacao com joi
const quartoSchema = Joi.object({
    id_Quarto: Joi.string().required(),
    andar_Quarto: Joi.string().required().max(15),
    tipo_Quarto: Joi.string().required().max(50),
    capacidade_Quarto: Joi.string().required().max(5),
    preço_Quarto:Joi.string().required()
});
 
exports.listarQuarto = async (req, res) => {
    try {
        const [result] = await db.query('Select * From quarto');
        res.json(result);//aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar quarto:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
//buscar cliente por cpf
exports.listarIdQuarto = async (req, res) => {
    const { id_Quarto } = req.params;
    try {
        const [result] = await db.query("Select * From quarto WHERE id_Quarto= ?", [id_Quarto]);
        if (result.length === 0) {
            return res.status(404).json({ erro:'Quarto não encontrado'});
 
        }
        res.json(result[0]);
    }catch(err){
        console.error('erro ao buscar Quarto:',err);
        res.status(500).json({error:'Erro interno do servidor'})
    }
};
 
exports.deletarQuarto= async (req,res) => {
    const{ id_Quarto } = req.params;
    try{
        await db.query('DELETE * FROM quarto WHERE id_Quarto = ?',[id_Quarto]);
        res.json({message:'Quarto deletado com  sucesso'});
    }catch(err){
        console.error('Erro ao deletar Quarto:',err);
        res.status(500).json({error:'Erro ao deletar Quarto'})
    }
};