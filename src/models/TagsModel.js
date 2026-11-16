
const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class TagsModel extends Model {
 
  static associate({ PostModel }) {
    TagsModel.belongsToMany(PostModel, {
        through: 'posts_tags',
        foreignKey: 'tags_id',
        otherKey: 'post_id',
        as: 'posts'
    });

  };
  
};

TagsModel.init(
    {
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    },
    {
        modelName: 'Tag',
        tableName: 'tags',
        timestamps: false,
        sequelize: connection
    }
);

module.exports = TagsModel;
