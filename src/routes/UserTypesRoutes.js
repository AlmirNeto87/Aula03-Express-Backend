const express = require('express');
const UserTypesController = require('../controllers/UsersTypesController')
const UserTypesRotas = express.Router();


const userTypesController = new UserTypesController();

UserTypesRotas.get('/users_types', userTypesController.listar);
UserTypesRotas.post('/users_types', userTypesController.criar)

module.exports = UserTypesRotas;