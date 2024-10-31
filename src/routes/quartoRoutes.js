const express = require('express');
const router = express.Router();
const quartoController = require('../controller/quartoController'); 

router.get('/quarto', quartoController.listarQuarto);
 
router.get('/quarto/:id_Quarto', quartoController.listarIdQuarto);
 
router.delete('/quarto/:id_Quarto', quartoController.deletarQuarto);
 
module.exports = router;