const express = require('express');
const router = express.Router();

//exemplo de uma rota GET
router.get ('/exemplo', (req,res)=>{
    res.send('Rota de exemplo')
});

//exemplo de outra rota GET
router.get ('/samara',(req,res)=>{
    res.send('Rota da Samara');
});

//exporte o roteador para que ele possa ser usado no index.js

module.exports = router