'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '用户id' },
      name: { type: STRING(30), allowNull: false, comment: '用户名', unique: true },
      nickname: { type: STRING(200), comment: '用户昵称' },
      birthday: { type: DATE, comment: '用户生日' },
      gender: { type: INTEGER, comment: '性别' },
      password: { type: STRING(200), allowNull: false, comment: '用户密码' },
      email: { type: STRING(200), comment: '用户邮箱' },
      avatar: { type: STRING(400), comment: '用户头像' },
      phone: { type: STRING(200), comment: '用户手机号' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
