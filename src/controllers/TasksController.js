const TaskModel = require('../models/TaskModel');

class TasksController{
    
    listar(request, response){
        
        console.log("Listando Tasks!");
        const listaTasks = TaskModel.listar();
        return response.send(listaTasks);
    }

    listarPorId(request, response){
        const { id } = request.params;
        const taskId = TaskModel.listarPorId(id);
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
        const novaTask = new TaskModel(nome, descricao);
        console.log(novaTask);
        return response.send(TaskModel.adicionarTask(novaTask));
    }

    atualizar(request, response){
        const { id } = request.params;
        const { nome, descricao } = request.body;
        const taskAtualizada = new TaskModel(nome, descricao);
        return response.send(TaskModel.editarTask(Number(id), taskAtualizada));
    }

    deletar(request, response){
        const { id } = request.params;
        return response.send(TaskModel.removerTask(Number(id)));
    }

}


module.exports = TasksController;