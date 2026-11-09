const exprees = require('express');
const TasksController = require('../controllers/TasksController');

const taskController = new TasksController();
const TasksRoutes = exprees.Router();

TasksRoutes.get('/tasks',taskController.listar); 

TasksRoutes.get('/tasks/:id',taskController.listarPorId);

TasksRoutes.post('/tasks',taskController.criar);

TasksRoutes.put('/tasks/:id', taskController.atualizar);

TasksRoutes.delete('/tasks/:id', taskController.deletar);




module.exports = TasksRoutes;