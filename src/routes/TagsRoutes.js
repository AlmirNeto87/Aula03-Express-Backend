const express = require('express');
const TagsController = require('../controllers/TagsController')
const TagsRoutes = express.Router();


const tagsController = new TagsController();

TagsRoutes.get('/tags', tagsController.listar);
TagsRoutes.post('/tags', tagsController.criar)

module.exports = TagsRoutes;