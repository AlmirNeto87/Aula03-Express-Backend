const express = require('express');
const CommentsController = require('../controllers/CommentsController')
const CommentsRoutes = express.Router();

const commentsController = new CommentsController();

CommentsRoutes.get('/comments', commentsController.listar);
CommentsRoutes.post('/comments', commentsController.criar);

module.exports = CommentsRoutes;