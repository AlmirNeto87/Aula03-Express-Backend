
const connection = require('../config/connection');

// Carrega os Models e configura os relacionamentos
require('../models');

async function syncDatabase() {
    try {
        await connection.sync({ force: true });
        console.log('Banco de dados sincronizado!');
    } catch (error) {
        console.error('Erro ao sincronizar:', error);
    } finally {
        await connection.close();
    }
}

syncDatabase();
