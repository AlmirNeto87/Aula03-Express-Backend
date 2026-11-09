const express = require('express'); 
const AuthController = require('../controllers/AuthController')


const PublicRoutes = express.Router(); // Filtro de Segurança 

PublicRoutes.post('/login',(request,response)=>{
    const {login , password} = request.body;
    const auth = new AuthController();
    const dados = auth.login(login, password); 

    if(dados.lenght){
        const usuario = dados[0];
        return response.json({
            token: usuario
        });
    };

    return response.json({
        message: "Login ou Senha Incorreto"
    })
});




module.exports = PublicRoutes;