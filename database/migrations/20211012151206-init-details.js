'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, TEXT } = Sequelize;
    await queryInterface.createTable('details', {
      id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, comment: '详情id' },
      article_id: { type: INTEGER, allowNull: false, comment: '文章id' },
      content: { type: TEXT, allowNull: false, comment: '文章内容' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('details');
  },
};
