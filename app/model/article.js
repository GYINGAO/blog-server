/* indent size: 2 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Article = app.model.define(
    'article',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        comment: '文章id',
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '作者id',
      },
      detail_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        comment: '标题',
      },
      summary: {
        type: DataTypes.STRING(1024),
        allowNull: true,
        comment: '摘要',
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '封面',
      },
      like_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '点赞数',
        defaultValue: 0,
      },
      comment_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '评论数',
        defaultValue: 0,
      },
      read_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '浏览量',
        defaultValue: 0,
      },
      top_flag: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '是否置顶',
      },
      push_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '发表时间',
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'articles',
    }
  );
  Article.associate = function () {
    app.model.Article.belongsTo(app.model.Category, {
      through: app.model.ArticleCategory, // sourcemodel 中的外键字段名称
      foreignKey: 'category_id',
      targetKey: 'id',
    });

    app.model.Article.belongsToMany(app.model.Tag, {
      through: app.model.ArticleTag,
      foreignKey: 'article_id',
      otherKey: 'tag_id',
    });

    app.model.Article.hasOne(app.model.Detail, { foreignKey: 'article_id' });
    app.model.Article.belongsTo(app.model.User, {
      foreignKey: 'user_id', // sourcemodel 中的外键字段名称
      targetKey: 'id', // targetmodel 中的目标键字段名称
    });
  };

  return Article;
};
