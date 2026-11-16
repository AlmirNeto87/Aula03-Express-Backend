const express = require('express');
const PostsController = require('../controllers/PostsController')
const PostsRoutes = express.Router();

const postsController = new PostsController();
// CRUD
PostsRoutes.get('/posts', postsController.listar);
PostsRoutes.get('/posts/:id', postsController.consultarPorId);
PostsRoutes.post('/posts', postsController.criar)
PostsRoutes.put('/posts/:id', postsController.atualizar)
PostsRoutes.delete('/posts/:id', postsController.deletar)

module.exports = PostsRoutes;