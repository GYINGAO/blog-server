'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('article_category', {
      article_id: { type: INTEGER, allowNull: false, primaryKey: true, comment: '文章id' },
      category_id: { type: INTEGER, allowNull: false, primaryKey: true, comment: '评论id' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('article_category');
  },
};
