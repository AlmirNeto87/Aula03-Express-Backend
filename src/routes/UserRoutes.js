const express = require('express');
const UserController = require('../controllers/UserController')
const UsersRoutes = express.Router();

const userController = new UserController();
// CRUD
UsersRoutes.get('/users', userController.listar);
UsersRoutes.get('/users/:id', userController.buscarPorId);
UsersRoutes.post('/users', userController.criar)
UsersRoutes.put('/users/:id', userController.atualizar)
UsersRoutes.delete('/users/:id', userController.deletar)

module.exports = UsersRoutes;