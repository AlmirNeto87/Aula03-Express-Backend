const UsuarioModel = require('../models/UsuarioModel');
class AuthController{
    login(login, password){
        const dados = UsuarioModel.authenticate(login, password)
        return(dados);
    }

}


module.exports = AuthController;