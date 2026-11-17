
const express = require('express');
const PostTagsController = require('../controllers/PostTagsController');

const PostTagsRoutes = express.Router();

const controller = new PostTagsController();

PostTagsRoutes.get('/posts-tags', controller.listar);

PostTagsRoutes.get('/posts-tags/:post_id', controller.buscarPorPost);

PostTagsRoutes.post('/posts-tags', controller.criar);

PostTagsRoutes.delete('/posts-tags/:post_id/:tags_id', controller.deletar);

module.exports = PostTagsRoutes;
