const express = require('express');
const router = express.Router();
const reservaController = require('../controller/reservaController'); // Importa o controller de cliente
 
// Rota para listar todos os cliente
router.get('/reserva', reservaController.listarReserva);
 
// Rota para buscar um cliente por CPF
router.get('/reserva/:id_Reserva', reservaController.listarReservaID);

router.post('/reserva', reservaController.adicionarReserva)

router.put('/reserva/:id_Reserva', reservaController.atualizarReserva)
 
// Rota para deletar um cliente por CPF
router.delete('/reserva/:id_Reserva', reservaController.deletarReserva);
 
module.exports = router;