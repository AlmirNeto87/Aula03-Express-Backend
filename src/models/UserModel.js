const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');
const UserTypesModel = require("./UserTypesModel");

class UserModel extends Model {
    static associate({ ProfileModel, UserTypesModel }) {
        UserModel.hasOne(ProfileModel, {
            foreignKey: 'user_id'
        });

        UserModel.belongsTo(UserTypesModel, {
            foreignKey: 'user_type_id'
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
        user_type_id: {
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