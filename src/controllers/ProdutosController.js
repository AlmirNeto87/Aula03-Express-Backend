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
        if(ProdutoId){
            return response.send(ProdutoId);
        }
        return response.status(404).send({
            error: "Produto não encontrado"
        });
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
        const { nome, valor } = request.body;
        const ProdutoAtualizado = new ProdutoModel(nome, valor);
        return response.send(ProdutoModel.editarProduto(Number(id), ProdutoAtualizado));
    }

    deletar(request, response){
        const { id } = request.params;
        return response.send(ProdutoModel.removerProduto(Number(id)));
    }

};


module.exports =ProdutosController;