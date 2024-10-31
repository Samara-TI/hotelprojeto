const db = require('../db/db');

const Joi = require('joi');

const reservaSchema = Joi.object({
    id_Reseva: Joi.string().length(11).required(),
    preço_Reserva: Joi.string().required(),
    formaPg_Reserva: Joi.string().required(),
    checkin_Reserva: Joi.date().required(),
    checkout_Reserva: Joi.date().required(),
    qntCrianca_Reserva: Joi.string().required().max(2),
    status_Reserva: Joi.string().required(),
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
    const { id_Reseva } = req.params;
    try {
        const [result] = await db.query("SELECT * FROM reserva WHERE id_Reserva = ?", [id_Reseva]);
        if (result.length === 0) {
            return res.status(404).json({ erro: 'Reserva não encontrada' });

        }
        res.json(result[0]);
    } catch (err) {
        console.error('erro ao buscar Reserva:', err);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
};

exports.deletarReserva = async (req, res) => {
    const { id_Reseva } = req.params;
    try {
        await db.query('DELETE * FROM reserva WHERE id_Reserva = ?', [id_Reseva]);
        res.json({ message: 'Reserva deletada com  sucesso' });
    } catch (err) {
        console.error('Erro ao deletar reserva:', err);
        res.status(500).json({ error: 'Erro ao deletar Reserva' })
    }
};




