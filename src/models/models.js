const UserModel = require('./UserModel');
const UserTypesModel = require('./UserTypesModel');
const ProfileModel = require('./ProfileModel');
const PostModel = require('./PostModel')
const TagsModel = require('./TagsModel')
const PostTagModel = require('./PostTagModel');

// Centralizando os Models
const models = {
     UserModel,
    UserTypesModel,
    ProfileModel,
    PostModel,
    TagsModel,
    PostTagModel
};

// Configurando os relacionamentos
Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

module.exports = models;
