
const CommentsModel = require('../models/CommentsModel');
const UserModel = require('../models/UserModel');

class CommentsController {

   
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

   
    async buscarPorUser(request, response) {

        try {

            const { userId } = request.params;

            const comentarios = await CommentsModel.findAll({
                where: {
                    user_id: userId
                },
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

            return response.json(comentarios);

        } catch (error) {

            console.error('Erro ao buscar comentários por usuário:', error);

            return response.status(500).json({
                message: 'Erro ao consultar comentários do usuário!'
            });
        }
    }

   
    async editar(request, response) {

        try {

            const { id } = request.params;
            const { content } = request.body;

            const comentario = await CommentsModel.findByPk(id);

            if (!comentario) {
                return response.status(404).json({
                    message: 'Comentário não encontrado!'
                });
            }

            await comentario.update({
                content
            });

            return response.json({
                message: 'Comentário atualizado com sucesso!',
                comentario
            });

        } catch (error) {

            console.error('Erro ao editar comentário:', error);

            return response.status(500).json({
                message: 'Erro ao atualizar comentário!'
            });
        }
    };

    
    // DELETAR COMENTÁRIO E TODOS OS SEUS FILHOS
    async deletar(request, response) {

        const transaction = await connection.transaction();

        try {

            const { id } = request.params;

            const comentario = await CommentsModel.findByPk(id, {
                transaction
            });

            if (!comentario) {

                await transaction.rollback();

                return response.status(404).json({
                    message: 'Comentário não encontrado!'
                });
            }

            await comentario.destroy({
                transaction
            });

            await transaction.commit();

            return response.json({
                message: 'Comentário e todas as suas respostas foram excluídos com sucesso!'
            });

        } catch (error) {

            await transaction.rollback();

            console.error('Erro ao deletar comentário:', error);

            return response.status(500).json({
                message: 'Erro ao deletar comentário!'
            });
        }
    };
  

};

module.exports = CommentsController;
