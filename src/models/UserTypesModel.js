const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class UserTypesModel extends Model {

    static associate({ UserModel }) {

        UserTypesModel.hasMany(UserModel, {
            foreignKey: 'type_id',
            as: 'users'
        });

    };



};

UserTypesModel.init(
    {
        type: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    },
    {
        tableName: 'user_types',
        sequelize: connection
    }
);

module.exports = UserTypesModel;