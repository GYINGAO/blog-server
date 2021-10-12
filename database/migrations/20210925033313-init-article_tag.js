'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('article_tag', {
      id: { type: INTEGER, allowNull: false, primaryKey: true, comment: 'id' },
      article_id: { type: INTEGER, allowNull: false, comment: '文章id' },
      tag_id: { type: INTEGER, allowNull: false, comment: '标签id' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('article_tag');
  },
};
