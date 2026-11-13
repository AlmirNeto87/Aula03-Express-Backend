const express = require('express');
const UsuariosRoutes = require('./UsuariosRoutes');
const TasksRoutes = require('./TasksRoutes');
// const UserRotas = require('./UserRotas');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const PrivateRoutes = express.Router();

PrivateRoutes.use((request, response, next) => {

    const authHeader = request.headers.authorization;

    console.log("Header recebido:", authHeader);

    if (!authHeader) {
        return response.status(401).json({
            message: "Token não informado"
        });
    }

    const token = authHeader.split(' ')[1];

    console.log("Token extraído:", token);

    try {

        const decoded = jwt.verify(token, process.env.APP_KEY_TOKEN);

        console.log("Token decodificado:", decoded);

        request.user = decoded;

        next();

    } catch (error) {

        console.log("Erro JWT:", error.name);
        console.log("Mensagem:", error.message);

        return response.status(403).json({
            message: "Token inválido ou expirado",
            error: error.message
        });
    }

});

PrivateRoutes.use(UsuariosRoutes);
// PrivateRoutes.use(UserRotas);
PrivateRoutes.use(TasksRoutes);

module.exports = PrivateRoutes;