const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController'); // Importa o controller de cliente

// Rota para listar todos os cliente
router.get('/clientes', clienteController.listarClientes);

// Rota para buscar um cliente por CPF
router.get('/clientes/:cpf', clienteController.listarClientesCpf);

// Rota para deletar um cliente por CPF
router.delete('/cliente/:cpf', clienteController.deletarCliente);

module.exports = router;