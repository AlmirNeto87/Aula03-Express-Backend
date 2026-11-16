
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class PostModel extends Model {

    static associate({ UserModel, TagsModel }) {

        PostModel.belongsTo(UserModel, {
            foreignKey: 'userId',
            as: 'user'
        });

        PostModel.belongsToMany(TagsModel, {
        through: 'posts_tags',
        foreignKey: 'post_id',
        otherKey: 'tags_id',
        as: 'tags'
        });

    };

};

PostModel.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: 'Post',
        tableName: 'posts',
        sequelize: connection
    }
);

module.exports = PostModel;
