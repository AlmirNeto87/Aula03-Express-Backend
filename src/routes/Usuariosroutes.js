const exprees = require('express');
const UsuarioController = require('../controllers/UsuariosController');

const usuarioController = new UsuarioController();
const UsuariosRoutes = exprees.Router();

UsuariosRoutes.get('/usuarios',usuarioController.listar); 

UsuariosRoutes.get('/usuarios/:id',usuarioController.listarPorId);

UsuariosRoutes.post('/usuarios',usuarioController.criar);

UsuariosRoutes.put('/usuarios/:id', usuarioController.atualizar);

UsuariosRoutes.delete('/usuarios/:id', usuarioController.deletar);




module.exports = UsuariosRoutes;