'use strict';

exports.sequelize = {
  dialect: 'mysql',
  host: '39.103.236.222',
  port: 3306,
  database: 'blog',
  username: 'root',
  password: 'GY0814.',
  define: {
    // model的全局配置
    timestamps: true, // 添加create,update,delete时间戳
    paranoid: true, // 添加软删除
    freezeTableName: false, // 防止修改表名为复数
    underscored: true, // 防止驼峰式字段被默认转为下划线
  },
  timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
  dialectOptions: {
    // 让读取date类型数据时返回字符串而不是UTC时间
    dateStrings: true,
    typeCast(field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
};
