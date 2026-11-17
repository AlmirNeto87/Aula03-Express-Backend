
const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const TagsModel = require('../models/TagsModel');
const connection = require('../config/connection');

class PostsController {

    // LISTAR POSTS
    async listar(request, response) {

        const permitidos = [
            'id',
            'user_id',
            'title',
            'slug',
            'content',
            'image_path',
            'created_at',
            'updated_at'
        ];

        const fields = request.query.fields
            ? request.query.fields.split(',')
            : permitidos;

        const atributos = fields
            .map(field => field.trim())
            .filter(field => permitidos.includes(field));

        if (atributos.length === 0) {
            return response.status(400).json({
                message: 'Nenhum campo válido informado!'
            });
        }

        try {

            const posts = await PostModel.findAll({
                attributes: atributos,
                include: [
                {
                    model: UserModel,
                    as: 'user',
                    attributes: ['username']
                },
                {
                    model: TagsModel,
                    as: 'tags',
                    through: {
                        attributes: []
                    }
                }
            ]
            });

            return response.json(posts);

        } catch (error) {

            console.error('Erro ao listar posts:', error);

            return response.status(500).json({
                message: 'Erro ao consultar posts!'
            });
        }
    }

    // CONSULTAR POST POR ID
    async consultarPorId(request, response) {

        const { id } = request.params;

        try {

            const post = await PostModel.findByPk(id, {

                attributes: [
                    'id',
                    'user_id',
                    'title',
                    'slug',
                    'content',
                    'image_path',
                    'created_at',
                    'updated_at'
                ],
                include: [
                {
                    model: UserModel,
                    as: 'user',
                    attributes: ['username'],
                 
                    include: [
                        {
                            model: ProfileModel,
                            as: 'profile',
                            attributes: [
                               'firstname',
                                'surname',
                                'picture_path'
                                 ]
                        }

                   ]
                },
                {
                    model: TagsModel,
                    as: 'tags',
                    through: {
                        attributes: []
                    }
                }
                
            ]

                // include: [
                //     {
                //         model: UserModel,
                //         as: 'user',

                //         attributes: [
                //             'username'
                //         ],

                //         include: [
                //             {
                //                 model: ProfileModel,
                //                 as: 'profile',
                //                 attributes: [
                //                     'firstname',
                //                     'surname',
                //                     'picture_path'
                //                 ]
                //             }
                //         ]
                //     }
                     
                // ]
            });

            if (!post) {
                return response.status(404).json({
                    message: 'Post não encontrado!'
                });
            }

            return response.json(post);

        } catch (error) {

            console.error('Erro ao consultar post:', error);

            return response.status(500).json({
                message: 'Erro ao consultar post!'
            });
        }
    }

    // CRIAR POST
   
    async criar(request, response) {

        const transaction = await PostModel.sequelize.transaction();

        try {

            const body = request.body;

            // Separar as Tags dos demais campos
            const { tags, ...dadosPost } = body;

            // Criar o Post
            const post = await PostModel.create(dadosPost, {
                transaction
            });

            // Associar Tags, caso tenham sido enviadas
            if (tags !== undefined) {

                if (!Array.isArray(tags)) {
                    await transaction.rollback();

                    return response.status(400).json({
                        message: 'Tags deve ser um array de IDs!'
                    });
                }

                if (tags.length > 0) {

                    await post.addTags(tags, {
                        transaction
                    });

                }
            }

            // Buscar Post com suas Tags
            const postCriado = await PostModel.findByPk(post.id, {
                include: [{
                    model: TagsModel,
                    as: 'tags'
                }],
                transaction
            });

            await transaction.commit();

            return response.status(201).json({
                message: 'Post cadastrado com sucesso!',
                post: postCriado
            });

        } catch (error) {

            await transaction.rollback();

            console.error('Erro ao criar Post:', error);

            return response.status(500).json({
                message: 'Erro ao cadastrar Post!'
            });
        }
    };


    // ATUALIZAR POST
    async atualizar(request, response) {

        const { id } = request.params;
        const body = request.body;

        try {

            const post = await PostModel.findByPk(id);

            if (!post) {
                return response.status(404).json({
                    message: 'Post não encontrado!'
                });
            }

            await post.update(body);

            return response.json({
                message: 'Post atualizado com sucesso!',
                post
            });

        } catch (error) {

            console.error('Erro ao atualizar post:', error);

            return response.status(500).json({
                message: 'Erro ao atualizar post!'
            });
        }
    }

    // DELETAR POST
    async deletar(request, response) {

        const { id } = request.params;

        try {

            const post = await PostModel.findByPk(id);

            if (!post) {
                return response.status(404).json({
                    message: 'Post não encontrado!'
                });
            }

            await post.destroy();

            return response.json({
                message: 'Post deletado com sucesso!'
            });

        } catch (error) {

            console.error('Erro ao deletar post:', error);

            return response.status(500).json({
                message: 'Erro ao deletar post!'
            });
        }
    }
}

module.exports = PostsController;
