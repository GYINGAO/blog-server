'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('categorys', {
      category_id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, comment: '分类id' },
      category_name: { type: STRING, allowNull: false, comment: '分类名称' },
      description: { type: STRING(128), comment: '分类描述' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('categorys');
  },
};
