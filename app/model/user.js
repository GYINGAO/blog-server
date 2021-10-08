/* indent size: 2 */
'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;

  const User = app.model.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        comment: '用户id',
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        comment: '用户名',
      },
      nickname: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '用户昵称',
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '用户生日',
        defaultValue: DataTypes.NOW(),
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '性别',
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '用户密码',
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '用户邮箱',
      },
      avatar: {
        type: DataTypes.STRING(400),
        allowNull: true,
        comment: '用户头像',
      },
      phone: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '用户手机号',
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '最后登录时间',
      },
    },
    {
      tableName: 'users',
    }
  );

  User.associate = function () {
    app.model.User.hasMany(app.model.Article, {
      foreignKey: 'user_id', // foreignkey 配置 targetmodel 中外键名称
      sorucekey: 'id', // sorucekey 配置 sourcemodel 中关联键名称
    });
  };

  return User;
};
