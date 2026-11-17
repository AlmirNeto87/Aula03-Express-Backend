
const express = require('express');
const AuthController = require('../controllers/AuthController');

const PublicRoutes = express.Router();

const authController = new AuthController();

PublicRoutes.post('/login', (request, response) => {
    return authController.login(request, response);
});

module.exports = PublicRoutes;
