'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('tags', {
      tag_id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, comment: '标签id' },
      tag_name: { type: STRING, allowNull: false, comment: '标签名称' },
      description: { type: STRING(128), allowNull: false, comment: '标签描述' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('tags');
  },
};
