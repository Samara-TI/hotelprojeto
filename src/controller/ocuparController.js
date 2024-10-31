const db = require('../db/db'); // Módulo de conexao com o banco de dados
 
const Joi = require('joi'); //biblioteca de validacao de dados
 
 
 
//validacao com joi
const ocuparSchema = Joi.object({
    id_Ocupar: Joi.string().required(),
    checkin_Ocupar: Joi.date().required(),
    checkout_Ocupar: Joi.date().required(),
});
 
exports.listarOcupar = async (req, res) => {
    try {
        const [result] = await db.query('Select * From ocupar');
        res.json(result);//aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar Ocupação:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
//buscar cliente por cpf
exports.listarIdOcupar = async (req, res) => {
    const { id_Ocupar } = req.params;
    try {
        const [result] = await db.query("Select * From ocupar WHERE id_Ocupar = ?", [id_Ocupar]);
        if (result.length === 0) {
            return res.status(404).json({ erro:'Ocupação não encontrada'});
 
        }
        res.json(result[0]);
    }catch(err){
        console.error('erro ao buscar Ocupação:',err);
        res.status(500).json({error:'Erro interno do servidor'})
    }
};
 
exports.deletarOcupar= async (req,res) => {
    const{id_Ocupar} = req.params;
    try{
        await db.query('DELETE * FROM ocupar WHERE id_Ocupar = ?',[id_Ocupar]);
        res.json({message:'Ocupação deletada com sucesso'});
    }catch(err){
        console.error('Erro ao deletar Ocupação:',err);
        res.status(500).json({error:'Erro ao deletar Ocupação'})
    }
};