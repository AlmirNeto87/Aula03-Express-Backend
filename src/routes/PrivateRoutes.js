const express = require('express'); 
const UsuariosRoutes = require('./UsuariosRoutes');
const TasksRoutes = require('./TasksRoutes');

const PrivateRoutes = express.Router(); // Filtro de Segurança 

// router.use((req, res, next) => {   
//     const token = req.headers['authorization'];   
//     if (token === 'meu-token-secreto') {     
//         next(); // Acesso liberado!   
//     } else {     
//         res.status(403).json({ mensagem: 'Não autorizado' });   
//     } 
// }); // Abaixo do middleware, todas as rotas estão protegidas 
PrivateRoutes.use((request, response, next)=>{

    if(request.headers.token !== "abcd123456"){
        return response.status(403).send({error: "Nao Autorizado"});
    }
      
    next();

});

PrivateRoutes.use(UsuariosRoutes); 
PrivateRoutes.use(TasksRoutes);


module.exports = PrivateRoutes;