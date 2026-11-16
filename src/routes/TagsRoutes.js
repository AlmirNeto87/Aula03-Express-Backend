const express = require('express');
let tagsController = require('../controllers/TagsController')
const TagsRotas = express.Router();


tagsController = new tagsController();

TagsRotas.get('/tags', tagsController.listar);
TagsRotas.post('/tags', tagsController.criar)

module.exports = TagsRotas;