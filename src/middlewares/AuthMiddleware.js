
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

async function AuthMiddleware(request, response, next) {

    const authHeader = request.headers.authorization;

    // Verificar se o header existe
    if (!authHeader) {
        return response.status(401).json({
            message: 'Token não informado!'
        });
    }

    // Verificar formato Bearer
    const [scheme, token, ...extra] = authHeader.trim().split(/\s+/);

    if (scheme !== 'Bearer' || !token || extra.length > 0) {
        return response.status(401).json({
            message: 'Formato do token inválido! Utilize Bearer.'
        });
    }

    try {

        // Validar token JWT
        const decoded = jwt.verify(
            token,
            process.env.APP_KEY_TOKEN,
            {
                algorithms: ['HS256']
            }
        );

        // Validar identificador do usuário
        if (!decoded.sub || !/^\d+$/.test(decoded.sub)) {
            return response.status(401).json({
                message: 'Token inválido!'
            });
        }

        // Buscar usuário no banco de dados
        const usuario = await UserModel.findByPk(decoded.sub);

        if (!usuario) {
            return response.status(401).json({
                message: 'Usuário não encontrado ou não autorizado!'
            });
        }

        // Disponibilizar usuário autenticado
        request.user = {
            id: usuario.id,
            username: usuario.username,
            type_id: usuario.type_id
        };

        return next();

    } catch (error) {

        if (
            error.name === 'TokenExpiredError' ||
            error.name === 'JsonWebTokenError' ||
            error.name === 'NotBeforeError'
        ) {
            return response.status(401).json({
                message: 'Token inválido ou expirado!'
            });
        }

        console.error('Erro na autenticação:', error);

        return response.status(500).json({
            message: 'Erro interno na autenticação!'
        });
    }
}

module.exports = AuthMiddleware;
