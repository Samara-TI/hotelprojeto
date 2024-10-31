const db = require('../db/db'); // Módulo de conexao com o banco de dados
 
const Joi = require('joi'); //biblioteca de validacao de dados
 
const bcrypt = require('bcrypt'); //para encriptacao de senhas
const { error } = require('console');
 
//validacao com joi
const clienteSchema = Joi.object({
    cpf_Cliente: Joi.string().length(11).required(),//cpf deve ser uma string(por causa do json) e ter 11 caracteres
    nome_Cliente: Joi.string().required().max(50),// nome deve ser um texto e ser obrigatorio ser preenchido, min:tamanho minimo de caracter
    dataNascimento: Joi.date().required(),
    endereco_Cliente: Joi.string().required(),
    telefone_Cliente: Joi.string().required().max(100),//max:tamanho maximo de caracter
    senha_Cliente: Joi.string().min(6).required(),
    email_Cliente: Joi.string().email().required(),
    sexo_Cliente:Joi.string().required()
});
 
exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('Select * From cliente');
        res.json(result);//aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
//buscar cliente por cpf
exports.listarClientesCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query("Select * From cliente WHERE cpf= ?", [cpf_Cliente]);
        if (result.length === 0) {
            return res.status(404).json({ erro:'Cliente não encontrado'});
 
        }
        res.json(result[0]);
    }catch(err){
        console.error('erro ao buscar cliente:',err);
        res.status(500).json({error:'Erro interno do servidor'})
    }
};
 
exports.deletarCliente = async (req,res) => {
    const{cpf} = req.params;
    try{
        await db.query('DELETE * FROM cliente WHERE cpf = ?',[cpf_Cliente]);
        res.json({message:'Cliente deletado com  sucesso'});
    }catch(err){
        console.error('Erro ao deletar cliente:',err);
        res.status(500).json({error:'Erro ao deletar cliente'})
    }
};