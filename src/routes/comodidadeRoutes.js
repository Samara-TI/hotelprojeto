const express = require('express');
const router = express.Router();
const comodidadeController = require('../controller/comodidadeController'); // 


router.get('/comodidade', comodidadeController.listarComodidade);

router.get('/comodidade/:id_Comodidade', comodidadeController.listarIdComodidade);

router.put('/comodidade/:id_Comodidade', comodidadeController.atualizarComodidade);

router.post('/comodidade', comodidadeController.adicionarComodidade);

router.delete('/comodidade/:id_Comodidade', comodidadeController.deletarComodidade);

module.exports = router;