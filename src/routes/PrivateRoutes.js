const express = require('express'); 
const router = express.Router(); // Filtro de Segurança 
router.use((req, res, next) => {   
    const token = req.headers['authorization'];   
    if (token === 'meu-token-secreto') {     
        next(); // Acesso liberado!   
    } else {     
        res.status(403).json({ mensagem: 'Não autorizado' });   
    } 
}); // Abaixo do middleware, todas as rotas estão protegidas 
router.use('/usuarios', require('./usuarioRoutes')); 
router.use('/posts', require('./postRoutes'));