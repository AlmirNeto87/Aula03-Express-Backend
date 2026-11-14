const UserModel = require('./UserModel');
const UserTypesModel = require('./UserTypesModel');
const ProfileModel = require('./ProfileModel');

// Centralizando os Models
const models = {
    UserModel,
    UserTypesModel,
    ProfileModel
};

// Configurando os relacionamentos
Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

module.exports = models;
