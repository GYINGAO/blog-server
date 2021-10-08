/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.multipart = {
    mode: 'stream',
    fileSize: '50mb',
    fields: '100',
    fileModeMatch: /(\/api\/article\/)$/,
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };

  config.customLoader = {
    rule: {
      directory: 'app/contract',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631850227964_2574';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  config.cors = {
    credentials: true,
    origin: '*',
    allowMethods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
  };

  config.jwt = {
    secret: 'MY_SECRET',
    expire: 24 * 60 * 60,
  };

  config.routerAuth = ['/admin/login', '/admin/register'];

  config.validate = {
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false, // 限制被验证值必须是一个对象。
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'node_demo',
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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
