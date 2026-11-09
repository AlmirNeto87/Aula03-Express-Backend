const UsuarioModel = require('../models/UsuarioModel');
class AuthController{
    login(login, password){
        const dados = UsuarioModel.authenticate(login, password)
        console.log(dados+"Debug AuthController")
        console.log(dados)
        return(dados);
    }

}


module.exports = AuthController;