
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

class AuthController {

    async login(request, response) {

        try {

            const { login, password } = request.body;

            // Validar campos obrigatórios
            if (!login || !password) {
                return response.status(400).json({
                    message: 'Informe login e senha!'
                });
            }

            // Verificar chave JWT
            if (!process.env.APP_KEY_TOKEN) {
                throw new Error('APP_KEY_TOKEN não configurada!');
            }

            // Buscar usuário no banco de dados
            const usuario = await UserModel.findOne({
                attributes: ['id', 'username', 'password'],
                where: {
                    username: login
                }
            });

            // Validar existência do usuário
            if (!usuario) {
                return response.status(401).json({
                    message: 'Login ou senha incorretos!'
                });
            }

            // Comparar senha com hash do banco
            const senhaValida = await bcrypt.compare(
                password,
                usuario.password
            );

            if (!senhaValida) {
                return response.status(401).json({
                    message: 'Login ou senha incorretos!'
                });
            }

            // Gerar token JWT
            const token = jwt.sign(
                {
                    sub: String(usuario.id)
                },
                process.env.APP_KEY_TOKEN,
                {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                }
            );

            return response.status(200).json({
                message: 'Login realizado com sucesso!',
                token
            });

        } catch (error) {

            console.error('Erro ao realizar login:', error);

            return response.status(500).json({
                message: 'Erro interno ao realizar login!'
            });
        }
    }
}

module.exports = AuthController;
