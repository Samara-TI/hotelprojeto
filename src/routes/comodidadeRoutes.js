const express = require('express');
const router = express.Router();
const comodidadeController = require('../controller/comodidadeController'); // 


router.get('/comodidade', comodidadeController.listarComodidade);

router.get('/comodidade/:cpf', comodidadeController.listarIdComodidade);


router.delete('/comodidade/:cpf', comodidadeController.deletarComodidade);

module.exports = router;