const express = require('express');
const ComentsController = require('../controllers/ComentsController')
const CommentsRoutes = express.Router();

const commentsController = new ComentsController();

CommentsRoutes.get('/comments', commentsController.listar);
CommentsRoutes.post('/comments', commentsController.criar);

module.exports = CommentsRoutes;