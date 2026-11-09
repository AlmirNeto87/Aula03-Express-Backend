const UsuarioModel = require('../models/UsuarioModel');

class UsuariosController{
    
    listar(request, response){
        
        console.log("Listando Usuario!");
        const listaUsuarios = UsuarioModel.listar();
        return response.send(listaUsuarios);
    }

    listarPorId(request, response){
        const { id } = request.params;
        const usuarioId = UsuarioModel.listarPorId(id);
        if (usuarioId) {
            return response.status(200).send(usuarioId);
        }
        return response.status(404).send({
            error: "Usuário não encontrado"
        });
    }

    criar(request, response){
        const { nome, email, login , password } = request.body;
        console.log(nome, email, login , password);
        const novoUsuario = new UsuarioModel(nome, email, login , password);
        console.log(novoUsuario);
        return response.send(UsuarioModel.adicionarUsuario(novoUsuario));
    }

    atualizar(request, response){
        const { id } = request.params;
        const { nome, email } = request.body;
        const usuarioAtualizado = new UsuarioModel(nome, email);
        return response.send(UsuarioModel.editarUsuario(Number(id), usuarioAtualizado));
    }

    deletar(request, response){
        const { id } = request.params;
        return response.send(UsuarioModel.removerUsuario(Number(id)));
    }

}


module.exports = UsuariosController;