
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class CommentsModel extends Model {

    static associate({ UserModel, PostModel, CommentsModel }) {

        // Um comentário pertence a um usuário
        CommentsModel.belongsTo(UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });

        // Um comentário pertence a um post
        CommentsModel.belongsTo(PostModel, {
            foreignKey: 'post_id',
            as: 'post'
        });

        // Um comentário pode ter vários comentários filhos
        CommentsModel.hasMany(CommentsModel, {
            foreignKey: 'parent_id',
            as: 'children'
        });

        // Um comentário pode pertencer a outro comentário
        CommentsModel.belongsTo(CommentsModel, {
            foreignKey: 'parent_id',
            as: 'parent'
        });

    }

}

CommentsModel.init(
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

        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        sequelize: connection
    }
);

module.exports = CommentsModel;
