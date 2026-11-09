const taskModel = require('../models/TasksModel');

class TasksController{
    
    listar(request, response){
        
        console.log("Listando Tasks!");
        const listaTasks = taskModel.listar();
        return response.send(listaTasks);
    }

    listarPorId(request, response){
        const { id } = request.params;
        const taskId = taskModel.listarPorId(id);
        if (taskId) {
            return response.status(200).send(taskId);
        }
        return response.status(404).send({
            error: "Task não encontrada"
        });
    }

    criar(request, response){
        const { nome, descricao } = request.body;
        console.log(nome, descricao);
        const novaTask = new taskModel(nome, descricao);
        console.log(novaTask);
        return response.send(taskModel.adicionarTask(novaTask));
    }

    atualizar(request, response){
        const { id } = request.params;
        const { nome, descricao } = request.body;
        const taskAtualizada = new taskModel(nome, descricao);
        return response.send(taskModel.editarTask(Number(id), taskAtualizada));
    }

    deletar(request, response){
        const { id } = request.params;
        return response.send(taskModel.removerTask(Number(id)));
    }

}


module.exports = TasksController;