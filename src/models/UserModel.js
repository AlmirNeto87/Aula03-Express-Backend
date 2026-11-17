
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class UserModel extends Model {

    static associate({
        ProfileModel,
        UserTypesModel,
        PostModel,
        CommentsModel
    }) {

        // Um usuário possui um perfil
        UserModel.hasOne(ProfileModel, {
            foreignKey: 'user_id',
            as: 'profile'
        });

        // Um usuário pertence a um tipo
        UserModel.belongsTo(UserTypesModel, {
            foreignKey: 'type_id',
            as: 'type'
        });

        // Um usuário pode criar vários posts
        UserModel.hasMany(PostModel, {
            foreignKey: 'user_id',
            as: 'posts'
        });

        // Um usuário pode fazer vários comentários
        UserModel.hasMany(CommentsModel, {
            foreignKey: 'user_id',
            as: 'comments'
        });

    }

}

UserModel.init(
    {
        is_active: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        username: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: 'User',
        tableName: 'users',
        sequelize: connection
    }
);

module.exports = UserModel;
