/* indent size: 2 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Tag = app.model.define(
    'tag',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: 'tags',
    }
  );

  Tag.associate = function () {
    Tag.belongsToMany(app.model.Article, {
      through: app.model.ArticleTag,
      foreignKey: 'tag_id',
      otherKey: 'article_id',
    });
  };

  return Tag;
};
