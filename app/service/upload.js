'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class UploadService extends Service {
  async avatar(stream) {
    const { app, ctx } = this;
    const { id } = stream.fields;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      return {
        __code_wrong: 40004,
        msg: '用户不存在',
      };
    }
    const filename = `${new Date().getTime()}-${id}-${stream.filename.toLowerCase()}`;
    const target = path.join(this.config.baseDir, 'app', 'public', 'avatar', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await await pump(stream, writeStream);
      const filePath = 'http://localhost:7001/public/avatar/' + filename;
      user.update({ avatar: filePath });
      return { id, avatar: filePath };
    } catch (err) {
      return {
        __code_wrong: 40000,
        msg: '上传失败',
      };
    }
  }
}

module.exports = UploadService;
