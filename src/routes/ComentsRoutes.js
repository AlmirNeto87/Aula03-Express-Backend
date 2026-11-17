const express = require('express');
const ComentsController = require('../controllers/ComentsController')
const CommentsRoutes = express.Router();

const commentsController = new ComentsController();

CommentsRoutes.get('/comments', commentsController.listar);
CommentsRoutes.post('/comments', commentsController.criar);
CommentsRoutes.get('/comments/user/:userId', commentsController.buscarPorUser);
CommentsRoutes.put('/comments/:id', commentsController.editar);
CommentsRoutes.delete('/comments/:id', commentsController.deletar);

module.exports = CommentsRoutes;