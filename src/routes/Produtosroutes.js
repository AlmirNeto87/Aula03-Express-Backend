const exprees = require('express');

const ProdutoController = require('../controllers/ProdutosController');

const produtoController = new ProdutoController();
const ProdutosRoutes = exprees.Router();


ProdutosRoutes.get('/produtos',produtoController.listar );

ProdutosRoutes.get('/produtos/:id',produtoController.listarPorId);

ProdutosRoutes.post('/produtos',produtoController.criar);

ProdutosRoutes.put('/produtos/:id',produtoController.atualizar );

ProdutosRoutes.delete('/produtos/:id',produtoController.deletar );




module.exports = ProdutosRoutes;