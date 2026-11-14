
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class ProfileModel extends Model {}

ProfileModel.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        picture_path: {
            type: DataTypes.STRING(255)
        },
        bio: {
            type: DataTypes.STRING(255)
        }
    },
    {
        tableName: 'profile',
        timestamps: false,
        sequelize: connection
    }
);

module.exports = ProfileModel;
