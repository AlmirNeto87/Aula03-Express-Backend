
const CommentsModel = require('../models/CommentsModel');
const UserModel = require('../models/UserModel');

class CommentsController {

    // LISTAR COMENTÁRIOS
    async listar(request, response) {

        try {

            const dados = await CommentsModel.findAll({
                include: [
                    {
                        model: UserModel,
                        as: 'user',
                        attributes: ['id', 'username']
                    },
                    {
                        model: CommentsModel,
                        as: 'children'
                    },
                    {
                        model: CommentsModel,
                        as: 'parent'
                    }
                ]
            });

            return response.json(dados);

        } catch (error) {

            console.error('Erro ao listar comentários:', error);

            return response.status(500).json({
                message: 'Erro ao consultar comentários!'
            });
        }
    }

    // CRIAR COMENTÁRIO
    async criar(request, response) {

        try {

            const body = request.body;

            const comentario = await CommentsModel.create(body);

            return response.status(201).json({
                message: 'Comentário cadastrado com sucesso!',
                comentario
            });

        } catch (error) {

            console.error('Erro ao criar comentário:', error);

            return response.status(500).json({
                message: 'Erro ao cadastrar comentário!'
            });
        }
    }

}

module.exports = CommentsController;
