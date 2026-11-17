
const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');

class UserController {

    // LISTAR USUÁRIOS
    async listar(request, response) {

        try {

            const users = await UserModel.findAll({
                attributes: { exclude: ['password'] },
                include: [{
                    model: ProfileModel,
                    as: 'profile'
                }]
            });

            return response.json(users);

        } catch (error) {

            console.error(error);

            return response.status(500).json({
                message: 'Erro ao listar usuários!'
            });
        }
    };

    // BUSCAR USUÁRIO POR ID
    async buscarPorId(request, response) {

        try {

            const { id } = request.params;

            const user = await UserModel.findByPk(id, {
                attributes: { exclude: ['password'] },
                include: [{
                    model: ProfileModel,
                    as: 'profile'
                }]
            });

            if (!user) {
                return response.status(404).json({
                    message: 'Usuário não encontrado!'
                });
            }

            return response.json(user);

        } catch (error) {

            console.error(error);

            return response.status(500).json({
                message: 'Erro ao buscar usuário!'
            });
        }
    };

    // CRIAR USUÁRIO
    async criar(request, response) {

        try {

            const body = request.body;

            if (!body.password) {
                return response.status(400).json({
                    message: 'A senha é obrigatória!'
                });
            }

            const senhaHash = await bcrypt.hash(body.password, 12);

            const user = await UserModel.create({
                username: body.username,
                password: senhaHash,
                profile: body.profile
            }, {
                include: [{
                    model: ProfileModel,
                    as: 'profile'
                }]
            });

            const userResponse = user.toJSON();
            delete userResponse.password;

            return response.status(201).json({
                message: 'Usuário cadastrado com sucesso!',
                user: userResponse
            });

        } catch (error) {

            console.error(error);

            return response.status(500).json({
                message: 'Erro ao cadastrar usuário!'
            });
        }
    };

   
    async atualizar(request, response) {

        try {

            const { id } = request.params;
            const body = { ...request.body };

            const user = await UserModel.findByPk(id);

            if (!user) {
                return response.status(404).json({
                    message: 'Usuário não encontrado!'
                });
            }

            // Se a senha foi enviada, gerar um novo hash
            if (body.password !== undefined) {

                if (
                    typeof body.password !== 'string' ||
                    body.password.length === 0
                ) {
                    return response.status(400).json({
                        message: 'A senha não pode ser vazia!'
                    });
                }

                body.password = await bcrypt.hash(body.password, 12);
            }

            // Atualizar todos os campos enviados
            await user.update(body);

            // Buscar usuário atualizado sem retornar a senha
            const userAtualizado = await UserModel.findByPk(id, {
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: ProfileModel,
                    as: 'profile'
                }]
            });

            return response.json({
                message: 'Usuário atualizado com sucesso!',
                user: userAtualizado
            });

        } catch (error) {

            console.error('Erro ao atualizar usuário:', error);

            return response.status(500).json({
                message: 'Erro ao atualizar usuário!'
            });
        }
    };


    // DELETAR USUÁRIO
    async deletar(request, response) {

        try {

            const { id } = request.params;

            const user = await UserModel.findByPk(id);

            if (!user) {
                return response.status(404).json({
                    message: 'Usuário não encontrado!'
                });
            }

            await user.destroy();

            return response.json({
                message: 'Usuário excluído com sucesso!'
            });

        } catch (error) {

            console.error(error);

            return response.status(500).json({
                message: 'Erro ao excluir usuário!'
            });
        }
    };
};

module.exports = UserController;
