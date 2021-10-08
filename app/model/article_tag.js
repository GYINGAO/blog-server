/* indent size: 2 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const ArticleTag = app.model.define(
    'article_tag',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      article_id: {
        type: DataTypes.INTEGER,
      },
      tag_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'article_tag',
    }
  );

  ArticleTag.associate = function () {};

  return ArticleTag;
};
