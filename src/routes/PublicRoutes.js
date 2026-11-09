const express = require('express'); 
const AuthController = require('../controllers/AuthController')
const jwt = require('jsonwebtoken');

const PublicRoutes = express.Router(); // Filtro de Segurança 

PublicRoutes.post('/login',(request,response)=>{
    const {login , password} = request.body;
    const auth = new AuthController();
    const dados = auth.login(login, password); 
    // console.log(dados+"debug PublicRoutes")
    if(dados){
        const token = jwt.sign(
            {id: dados.id,
            login: dados.login
            }    
            , 'ABCDE123456@*#'
        )
        console.log(token);
        return response.json({
            token: token
        });
    };

    return response.json({
        message: "Login ou Senha Incorreto"
    })
});




module.exports = PublicRoutes;