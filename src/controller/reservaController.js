const db = require('../db/db');

const Joi = require('joi');

const reservaSchema = Joi.object({
    //id_Reseva: Joi.string().length(11).required(),
    preço_Reserva: Joi.string().required(),
    formaPg_Reserva: Joi.string().required(),
    checkin_Reserva: Joi.date().required(),
    checkout_Reserva: Joi.date().required(),
    qntCrianca_Reserva: Joi.string().required().max(2),
    status_Reserva: Joi.string().required(),
    id_Quarto: Joi.string().required(),
    cpf_Cliente:Joi.string().required()
});

exports.listarReserva = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM reserva');
        res.json(result);//aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


exports.listarReservaID = async (req, res) => {
    const { id_Reserva } = req.params;
    try {
        const [result] = await db.query("SELECT * FROM reserva WHERE id_Reserva = ?", [id_Reserva]);
        if (result.length === 0) {
            return res.status(404).json({ erro: 'Reserva não encontrada' });

        }
        res.json(result[0]);
    } catch (err) {
        console.error('erro ao buscar Reserva:', err);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
};

exports.atualizarReserva = async (req, res) => {
    const { id_Reserva } = req.params;
    const { preço_Reserva, formaPg_Reserva, checkin_Reserva, checkout_Reserva,qntCrianca_Reserva,status_Reserva, id_Quarto,cpf_Cliente } = req.body;
    const { error } = reservaSchema.validate({ preço_Reserva, formaPg_Reserva, checkin_Reserva, checkout_Reserva,qntCrianca_Reserva,status_Reserva, id_Quarto,cpf_Cliente });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query("Select * From reserva WHERE id_Reserva = ?", [id_Reserva]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Reserva não encontrada' });
        }
        const reservaAtualizado = { preço_Reserva, formaPg_Reserva, checkin_Reserva, checkout_Reserva,qntCrianca_Reserva,status_Reserva, id_Quarto,cpf_Cliente };
        await db.query('UPDATE reserva SET ? WHERE id_Reserva = ?', [reservaAtualizado, id_Reserva]);
 
        res.json({ message: 'Reserva atualizada com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar reserva:', err);
        res.status(500).json({ error: 'Erro ao atualizar reserva' });
    }
 
}


exports.adicionarReserva = async (req, res) => {
    const { id_Reserva, preço_Reserva, formaPg_Reserva, checkin_Reserva, checkout_Reserva,qntCrianca_Reserva,status_Reserva, id_Quarto,cpf_Cliente } = req.body;

    // Validação de dados
    const { error } = reservaSchema.validate({ preço_Reserva, formaPg_Reserva, checkin_Reserva, checkout_Reserva,qntCrianca_Reserva,status_Reserva, id_Quarto,cpf_Cliente });
    if (error) {
        return res.status(404).json({ error: error.details[0].message });
    }
    try {
        // Criptografando a senha

        const novaReserva = { id_Reserva, preço_Reserva, formaPg_Reserva, checkin_Reserva, checkout_Reserva,qntCrianca_Reserva,status_Reserva, id_Quarto,cpf_Cliente  };
        await db.query('INSERT INTO reserva SET ?', novaReserva);

        res.json({ message: 'Reserva adicionada com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar Reserva:', err);
        res.status(500).json({ error: 'Erro ao adicionar Reserva' });
    }
};

exports.deletarReserva = async (req, res) => {
    const { id_Reseva } = req.params;
    try {
        await db.query('DELETE FROM reserva WHERE id_Reserva = ?', [id_Reseva]);
        res.json({ message: 'Reserva deletada com  sucesso' });
    } catch (err) {
        console.error('Erro ao deletar reserva:', err);
        res.status(500).json({ error: 'Erro ao deletar Reserva' })
    }
};




