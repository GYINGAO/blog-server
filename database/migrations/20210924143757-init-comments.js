'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('comments', {
      id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, comment: '评论id' },
      article_id: { type: INTEGER, allowNull: false, comment: '文章id' },
      user_id: { type: INTEGER, allowNull: false, comment: '发表用户id' },
      like_count: { type: INTEGER, comment: '点赞数' },
      content: { type: STRING(3072), comment: '评论内容' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('comments');
  },
};
