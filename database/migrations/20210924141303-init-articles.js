'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('articles', {
      id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, comment: '文章id' },
      user_id: { type: INTEGER, allowNull: false, comment: '作者id' },
      title: { type: STRING(1024), allowNull: false, comment: '标题' },
      summary: { type: STRING(1024), allowNull: false, comment: '摘要' },
      content: { type: TEXT, allowNull: false, comment: '文章内容' },
      like_count: { type: INTEGER, comment: '点赞数' },
      comment_count: { type: INTEGER, comment: '评论数' },
      read_count: { type: INTEGER, comment: '浏览量' },
      top_flag: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '是否置顶' },
      push_date: { type: DATE, comment: '发表时间' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('articles');
  },
};
