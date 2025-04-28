const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController'); // Importa o controller de cliente

// Rota para listar todos os cliente
router.get('/cliente', clienteController.listarClientes);

// Rota para buscar um cliente por CPF
router.get('/cliente/:cpf_Cliente', clienteController.listarClientesCpf);

router.post('/cliente', clienteController.adicionarCliente);

// Rota para atualizar um cliente por CPF
router.put('/cliente/:cpf_Cliente', clienteController.atualizarCliente);


// Rota para deletar um cliente por CPF
router.delete('/cliente/:cpf_Cliente', clienteController.deletarCliente);

module.exports = router;