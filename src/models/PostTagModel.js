
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class PostTagModel extends Model {

    static associate({ PostModel, TagsModel }) {

        PostTagModel.belongsTo(PostModel, {
            foreignKey: 'post_id',
            as: 'post'
        });

        PostTagModel.belongsTo(TagsModel, {
            foreignKey: 'tags_id',
            as: 'tag'
        });

    }

}

PostTagModel.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        tags_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        modelName: 'PostTag',
        tableName: 'posts_tags',
        timestamps: false,
        sequelize: connection
    }
);

module.exports = PostTagModel;
