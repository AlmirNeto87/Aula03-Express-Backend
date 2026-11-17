
const PostTagModel = require('../models/PostTagModel');
const PostModel = require('../models/PostModel');
const TagsModel = require('../models/TagsModel');

class PostTagsController {

    // LISTAR ASSOCIAÇÕES
    async listar(request, response) {

        try {

            const dados = await PostTagModel.findAll({
                include: [
                    {
                        model: PostModel,
                        as: 'post'
                    },
                    {
                        model: TagsModel,
                        as: 'tag'
                    }
                ]
            });

            return response.json(dados);

        } catch (error) {

            console.error('Erro ao listar associações:', error);

            return response.status(500).json({
                message: 'Erro ao listar associações!'
            });
        }
    }

    // BUSCAR TAGS DE UM POST
    async buscarPorPost(request, response) {

        try {

            const { post_id } = request.params;

            const dados = await PostTagModel.findAll({
                where: {
                    post_id
                },
                include: [{
                    model: TagsModel,
                    as: 'tag'
                }]
            });

            return response.json(dados);

        } catch (error) {

            console.error('Erro ao buscar Tags do Post:', error);

            return response.status(500).json({
                message: 'Erro ao consultar Tags do Post!'
            });
        }
    }

    // ASSOCIAR TAG A UM POST
    async criar(request, response) {

        try {

            const { post_id, tags_id } = request.body;

            if (!post_id || !tags_id) {
                return response.status(400).json({
                    message: 'Informe o Post e a Tag!'
                });
            }

            const post = await PostModel.findByPk(post_id);
            const tag = await TagsModel.findByPk(tags_id);

            if (!post || !tag) {
                return response.status(404).json({
                    message: 'Post ou Tag não encontrado!'
                });
            }

            const existente = await PostTagModel.findOne({
                where: {
                    post_id,
                    tags_id
                }
            });

            if (existente) {
                return response.status(409).json({
                    message: 'Esta Tag já está associada a este Post!'
                });
            }

            const associacao = await PostTagModel.create({
                post_id,
                tags_id
            });

            return response.status(201).json({
                message: 'Tag associada ao Post com sucesso!',
                associacao
            });

        } catch (error) {

            console.error('Erro ao associar Tag:', error);

            return response.status(500).json({
                message: 'Erro ao associar Tag ao Post!'
            });
        }
    }

    // REMOVER TAG DE UM POST
    async deletar(request, response) {

        try {

            const { post_id, tags_id } = request.params;

            const associacao = await PostTagModel.findOne({
                where: {
                    post_id,
                    tags_id
                }
            });

            if (!associacao) {
                return response.status(404).json({
                    message: 'Associação não encontrada!'
                });
            }

            await associacao.destroy();

            return response.json({
                message: 'Tag removida do Post com sucesso!'
            });

        } catch (error) {

            console.error('Erro ao remover Tag:', error);

            return response.status(500).json({
                message: 'Erro ao remover Tag do Post!'
            });
        }
    }

}

module.exports = PostTagsController;
