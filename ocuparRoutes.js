const express = require('express');
const router = express.Router();
const ocuparController = require('../controller/ocuparController');
 
router.get('/ocupar', ocuparController.listarOcupar);
 
router.get('/ocupar/:id_Ocupar', ocuparController.listarIdOcupar);
 
router.post('/ocupar', ocuparController.adicionarOcupar);
 
router.put('/ocupar/:id_Ocupar', ocuparController.atualizarOcupar)
 
router.delete('/ocupar/:id_Ocupar', ocuparController.deletarOcupar);
 
module.exports = router;