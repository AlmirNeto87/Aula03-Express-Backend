
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class PostModel extends Model {

    static associate({ UserModel, TagsModel, PostTagModel, CommentsModel }) {

        // Um post pertence a um usuário
        PostModel.belongsTo(UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });

        // Um post pode possuir várias tags
        PostModel.belongsToMany(TagsModel, {
            through: PostTagModel,
            foreignKey: 'post_id',
            otherKey: 'tags_id',
            as: 'tags'
        });

        PostModel.hasMany(CommentsModel, {
            foreignKey: 'post_id',
            as: 'comments'
        });

        

    }

}

PostModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        slug: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        image_path: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },
    {
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        sequelize: connection
    }
);

module.exports = PostModel;
