const express = require('express');
const router = express.Router();
const ocuparController = require('../controller/ocuparController'); 

router.get('/ocupar', ocuparController.listarOcupar);
 
router.get('/ocupar/:id_Ocupar', ocuparController.listarIdOcupar);
 
router.delete('/ocupar/:id_Ocupar', ocuparController.deletarOcupar);
 
module.exports = router;