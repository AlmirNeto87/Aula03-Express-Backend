
const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');

class UserController {

    // LISTAR USUÁRIOS
    async listar(request, response) {

        const users = await UserModel.findAll({
            attributes: { exclude: ['password'] },
            include: [{
                model: ProfileModel,
                as: 'profile'
            }]
        });

        return response.json(users);
    };

    // BUSCAR USUÁRIO POR ID
    async buscarPorId(request, response) {

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
                message: "Usuário não encontrado"
            });
        }

        return response.json(user);
    };

    // CRIAR USUÁRIO
    async criar(request, response) {

        const body = request.body;

        // Gerar hash da senha
        body.password = await bcrypt.hash(body.password, 12);

        const user = await UserModel.create(body, {
            include: [{
                model: ProfileModel,
                as: 'profile'
            }]
        });

        // Não retornar a senha
        const userResponse = user.toJSON();
        delete userResponse.password;

        return response.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: userResponse
        });
    };

    // ATUALIZAR USUÁRIO
    async atualizar(request, response) {

        const { id } = request.params;
        const body = request.body;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return response.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        // Se uma nova senha foi enviada, gerar hash
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 12);
        }

        await user.update(body);

        const userAtualizado = await UserModel.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: ProfileModel,
                as: 'profile'
            }]
        });

        return response.json({
            message: "Usuário atualizado com sucesso",
            user: userAtualizado
        });
    };

    // DELETAR USUÁRIO
    async deletar(request, response) {

        const { id } = request.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            return response.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        await user.destroy();

        return response.json({
            message: "Usuário excluído com sucesso"
        });
    };
};

module.exports = UserController;
