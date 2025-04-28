const db = require('../db/db'); // Módulo de conexao com o banco de dados
 
const Joi = require('joi'); //biblioteca de validacao de dados
 
 
 
//validacao com joi
const ocuparSchema = Joi.object({
 
    checkin_Ocupar: Joi.date().required(),
    checkout_Ocupar: Joi.date().required(),
    cpf_Cliente: Joi.string().required(),
    id_Quarto: Joi.string().required()
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
            return res.status(404).json({ error: 'Ocupação não encontrada' });
 
        }
        res.json(result[0]);
    } catch (err) {
        console.error('erro ao buscar Ocupação:', err);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
};
 
exports.adicionarOcupar = async (req, res) => {
    const { id_Ocupar, checkin_Ocupar, checkout_Ocupar, cpf_Cliente, id_Quarto } = req.body;
 
    const { error } = ocuparSchema.validate({ checkin_Ocupar, checkout_Ocupar, cpf_Cliente, id_Quarto });
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    try {
        const novoOcupar = { id_Ocupar, checkin_Ocupar, checkout_Ocupar, cpf_Cliente, id_Quarto };
        await db.query('INSERT INTO ocupar SET ?', novoOcupar);
 
        res.json({ message: 'Ocupação adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar ocupação:', err);
        res.status(500).json({ error: 'Erro ao adicionar ocupação' });
    }
};
 
exports.atualizarOcupar = async (req, res) => {
    const { id_Ocupar } = req.params;
    const { checkin_Ocupar, checkout_Ocupar, cpf_Cliente, id_Quarto } = req.body;
    const { error } = ocuparSchema.validate({ checkin_Ocupar, checkout_Ocupar, cpf_Cliente, id_Quarto });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query("Select * From ocupar WHERE id_Ocupar = ?", [id_Ocupar]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Ocupação não encontrada' });
        }
        const ocuparAtualizado = { checkin_Ocupar, checkout_Ocupar, cpf_Cliente, id_Quarto };
        await db.query('UPDATE ocupar SET ? WHERE id_Ocupar = ?', [ocuparAtualizado, id_Ocupar]);
 
        res.json({ message: 'Ocupação atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar ocupação:', err);
        res.status(500).json({ error: 'Erro ao atualizar ocupação' });
    }
 
}
 
 
 
exports.deletarOcupar = async (req, res) => {
    const { id_Ocupar } = req.params;
    try {
        await db.query('DELETE FROM ocupar WHERE id_Ocupar = ?', [id_Ocupar]);
        res.json({ message: 'Ocupação deletada com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar Ocupação:', err);
        res.status(500).json({ error: 'Erro ao deletar Ocupação' })
    }
};