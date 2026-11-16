
const connection = require('../config/connection');

// Carrega os Models e configura os relacionamentos
require('../models/models');

async function syncDatabase() {
    try {
        await connection.authenticate();

        console.log('Conexão com banco estabelecida!');

        await connection.sync();

        console.log('Tabelas sincronizadas com sucesso!');

    } catch (error) {
        console.error('Erro ao sincronizar banco:', error);
        throw error;
    }
}

module.exports = syncDatabase;