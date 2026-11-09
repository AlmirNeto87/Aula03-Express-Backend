const express = require('express'); 
const AuthController = require('../controllers/AuthController')


const PublicRoutes = express.Router(); // Filtro de Segurança 

PublicRoutes.post('/login',(request,response)=>{
    const {login , password} = request.body;
    const auth = new AuthController();
    const dados = auth.login(login, password); 
    console.log(dados+"debug PublicRoutes")
    if(dados){
        
        return response.json({
            token: dados
        });
    };

    return response.json({
        message: "Login ou Senha Incorreto"
    })
});




module.exports = PublicRoutes;