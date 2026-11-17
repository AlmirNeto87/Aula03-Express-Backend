
const jwt = require('jsonwebtoken');

function AuthMiddleware(request, response, next) {

    const authHeader = request.headers.authorization;

    // Verificar se o header existe
    if (!authHeader) {
        return response.status(401).json({
            message: 'Token não informado!'
        });
    }

    // Verificar formato Bearer
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return response.status(401).json({
            message: 'Formato do token inválido! Utilize Bearer.'
        });
    }

    try {

        // Validar token
        const decoded = jwt.verify(
            token,
            process.env.APP_KEY_TOKEN,
            {
                algorithms: ['HS256']
            }
        );

        // Disponibilizar usuário autenticado
        request.user = {
            id: Number(decoded.sub)
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
