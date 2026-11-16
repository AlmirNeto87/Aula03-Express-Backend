const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class UserModel extends Model {
    static associate({ ProfileModel, UserTypesModel, PostModel, CommentsModel }) {

        UserModel.hasOne(ProfileModel, {
            foreignKey: 'user_id'
        });

        UserModel.belongsTo(UserTypesModel, {
            foreignKey: 'type_id'
        });

         UserModel.hasMany(PostModel, {
            foreignKey: 'userId',
            as: 'posts'
        });

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
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        sequelize: connection
    }
);

module.exports = UserModel;