const db = require('../db/db'); // Módulo de conexao com o banco de dados

const Joi = require('joi'); //biblioteca de validacao de dados

const bcrypt = require('bcrypt'); //para encriptacao de senhas
const { error } = require('console');
const { hash } = require('crypto');

//validacao com joi
const clienteSchema = Joi.object({
    cpf_Cliente: Joi.string().length(11).required(),//cpf deve ser uma string(por causa do json) e ter 11 caracteres
    nome_Cliente: Joi.string().required().max(50),// nome deve ser um texto e ser obrigatorio ser preenchido, min:tamanho minimo de caracter
    endereco_Cliente: Joi.string().required(),
    telefone_Cliente: Joi.string().required().max(100),//max:tamanho maximo de caracter
    dataNascimento_Cliente: Joi.string().required(),
    sexo_Cliente: Joi.string().required(),
    email_Cliente: Joi.string().email().required(),
    senha_Cliente: Joi.string().min(6).required()
    
});

exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('Select *From cliente');
        res.json(result);//aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//buscar cliente por cpf
exports.listarClientesCpf = async (req, res) => {
    const { cpf_Cliente } = req.params;
    try {
        const [result] = await db.query("SELECT * FROM cliente WHERE cpf_Cliente = ?", [cpf_Cliente]);
        if (result.length === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Adicionar um novo cliente
exports.adicionarCliente = async (req, res) => {
    const { cpf_Cliente, nome_Cliente, endereco_Cliente, telefone_Cliente,dataNascimento_Cliente, sexo_Cliente,  email_Cliente,senha_Cliente } = req.body;

    // Validação de dados
    const { error } = clienteSchema.validate({ cpf_Cliente, nome_Cliente, endereco_Cliente, telefone_Cliente,dataNascimento_Cliente, sexo_Cliente,  email_Cliente,senha_Cliente });
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    try {
        // Criptografando a senha
        const hash = await bcrypt.hash(senha_Cliente, 10);

        const novoCliente = { cpf_Cliente, nome_Cliente, endereco_Cliente, telefone_Cliente,dataNascimento_Cliente,sexo_Cliente,email_Cliente, senha_Cliente: hash,   };
        await db.query('INSERT INTO cliente SET ?', novoCliente);

        res.json({ message: 'Cliente adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
};

// Atualizar um cliente
exports.atualizarCliente = async (req, res) => {
    const { cpf_Cliente } = req.params;
    const { nome_Cliente, endereco_Cliente, telefone_Cliente,dataNascimento_Cliente, senha_Cliente, email_Cliente, sexo_Cliente } = req.body;

    // Validação de dados
    const { error } = clienteSchema.validate({cpf_Cliente, nome_Cliente, endereco_Cliente, telefone_Cliente,dataNascimento_Cliente, senha_Cliente, email_Cliente, sexo_Cliente });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {

         const [result] = await db.query("Select * From cliente WHERE cpf_Cliente= ?", [cpf_Cliente]);
        if (result.length === 0) {
            return res.status(404).json({ erro:'Cliente não encontrado'});
        }
        // Criptografando a senha
        const hash = await bcrypt.hash(senha_Cliente, 10);

        const clienteAtualizado = {cpf_Cliente,  endereco_Cliente, telefone_Cliente,dataNascimento_Cliente, senha_Cliente:hash, email_Cliente, sexo_Cliente };
        await db.query('UPDATE cliente SET ? WHERE cpf_Cliente = ?', [clienteAtualizado, cpf_Cliente]);

        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }



}

exports.deletarCliente = async (req, res) => {
    const { cpf_Cliente } = req.params;
    try {
        await db.query('DELETE FROM cliente WHERE cpf_Cliente = ?', [cpf_Cliente]);
        res.json({ message: 'Cliente deletado com  sucesso' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente' })
    }
}