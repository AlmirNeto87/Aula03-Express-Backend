const express = require('express');
const UserController = require('../controllers/UserController')
const UsersRotas = express.Router();

const userController = new UserController();
// CRUD
UsersRotas.get('/users', userController.listar);
// UsuariosRotas.get('/users/:id', userController.consultarPorId);
// UsersRotas.post('/users', userController.criar)
// UsuariosRotas.put('/users/:id', userController.atualizar)
// UsuariosRotas.delete('/users/:id', userController.deletar)

module.exports = UsersRotas;