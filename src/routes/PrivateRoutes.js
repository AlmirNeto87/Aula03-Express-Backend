
const express = require('express');

const AuthMiddleware = require('../middlewares/AuthMiddleware');

const UsuariosRoutes = require('./UsuariosRoutes');
const TasksRoutes = require('./TasksRoutes');
const UserRoutes = require('./UserRoutes');
const UserTypesRotas = require('./UserTypesRoutes');
const TagsRoutes = require('./TagsRoutes');
const PostsRoutes = require('./PostsRoutes');
const CommentsRoutes = require('./ComentsRoutes');
const PostTagsRoutes = require('./PostTagsRoutes');

const PrivateRoutes = express.Router();

// Todas as rotas abaixo exigem autenticação
PrivateRoutes.use(AuthMiddleware);

PrivateRoutes.use(UsuariosRoutes);
PrivateRoutes.use(TasksRoutes);
PrivateRoutes.use(UserRoutes);
PrivateRoutes.use(UserTypesRotas);
PrivateRoutes.use(TagsRoutes);
PrivateRoutes.use(PostsRoutes);
PrivateRoutes.use(CommentsRoutes);
PrivateRoutes.use(PostTagsRoutes);

module.exports = PrivateRoutes;
