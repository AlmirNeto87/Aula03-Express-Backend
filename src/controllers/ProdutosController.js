const ProdutoModel = require('../models/ProdutoModel');

class ProdutosController{
    
    listar(request, response){
        
        console.log("Listando Produto!");
        const listaProdutos = ProdutoModel.listar();
        return response.send(listaProdutos);
    }

    listarPorId(request, response){
        const { id } = request.params;
        const ProdutoId = ProdutoModel.listarPorId(id);
        return response.send(ProdutoId);
    }

    criar(request, response){
        const { nome, valor } = request.body;
        console.log(nome, valor);
        const novoProduto = new ProdutoModel(nome, valor);
        console.log(novoProduto);
        return response.send(ProdutoModel.adicionarProduto(novoProduto));
    }

    atualizar(request, response){
        const { id } = request.params;
        const { nome, email } = request.body;
        const ProdutoAtualizado = new ProdutoModel(nome, email);
        return response.send(ProdutoModel.editarProduto(Number(id), ProdutoAtualizado));
    }

    deletar(request, response){
        const { id } = request.params;
        return response.send(ProdutoModel.removerProduto(Number(id)));
    }

};


module.exports =ProdutosController;