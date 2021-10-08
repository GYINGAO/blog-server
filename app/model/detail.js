/* indent size: 2 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Detail = app.model.define(
    'detail',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        comment: '文章id',
        autoIncrement: true,
      },
      article_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'article',
          key: 'id',
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '文章内容',
      },
    },
    {
      tableName: 'details',
    }
  );

  Detail.associate = function () {
    Detail.belongsTo(app.model.Article, { foreignKey: 'article_id', targetKey: 'id' });
  };

  return Detail;
};
