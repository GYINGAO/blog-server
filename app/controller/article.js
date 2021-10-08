'use strict';

const BaseController = require('./base');
const rule = require('../contract/article');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const await = require('await-stream-ready/lib/await');

class ArticleController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'article';
    this.title = '文章';
    this.rule = rule;
  }

  async create() {
    const { ctx, service } = this;
    const id = await service.article.create(ctx.request.body);
    const files = [];
    for (const file of ctx.request.files) {
      const filename = `${new Date().getTime()}-${id}-${file.filename.toLowerCase()}`;
      const target = path.join(this.config.baseDir, 'app', 'public', 'cover', filename);
      const Readfile = fs.readFileSync(file.filepath);
      fs.writeFileSync(target, Readfile);
      files.push('http://localhost:7001/public/cover/' + filename);
    }
    const res = await service.article.update({ id, info: { cover: files.join(',') } });
    if (res.__code_wrong) {
      ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: `${this.title}创建失败` });
    } else {
      ctx.helper.body.CREATED_UPDATE({ ctx, msg: `${this.title}创建成功`, res: res.dataValues });
    }

    // // 获取多个文件提交的数据流，多文件上传专用
    // const parts = ctx.multipart({ autoFields: true });
    // const files = [];

    // let stream;
    // while ((stream = await parts()) != null) {
    //   // 判断用户是否选择上传图片
    //   if (!stream.filename) {
    //     ctx.throw('请选择上传的图片!');
    //     return;
    //   }
    //   // filename 获取上传的文件名 xxx.jpg
    //   const filename = `${new Date().getTime()}-${stream.filename.toLowerCase()}`;
    //   // fieldname 获取文件表单提交的字段名称
    //   const fieldname = stream.fieldname;
    //   // 拼接上传路径
    //   const target = path.join(this.config.baseDir, 'app', 'public', 'cover', filename);
    //   // 创建可写流
    //   const writeStream = fs.createWriteStream(target);
    //   // 读取文件 && 写入 && 销毁当前流
    //   await pump(stream, writeStream);
    //   files.push('http://localhost:7001/public/cover/' + filename);
    // }

    // ctx.body = {
    //   files,
    //   fields: parts.field,
    // };

    // const res = await service[this.entity].create(ctx.request.body);
    // if (!res.__code_wrong) {
    //   ctx.helper.body.CREATED_UPDATE({ ctx, msg: `创建${this.title}成功`, res: res.dataValues });
    // } else {
    //   ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: `${this.title}'${res.data}'已存在` });
    // }
  }

  async index() {
    const { ctx, service } = this;
    const { toInt } = ctx.helper.tools;
    const limit = toInt(ctx.query.pageSize);
    const offset = toInt(ctx.query.pageSize) * (toInt(ctx.query.currentPage) - 1);

    const query = {};
    if (limit) {
      query.limit = limit;
      query.offset = offset;
    }
    if (ctx.query.like) {
      query.where = {
        name: { [Op.like]: `%${ctx.query.like}%` },
      };
    }
    query.include = [{ model: ctx.model.Tag, attributes: ['id', 'name'] }];
    const res = await service[this.entity].index(query);
    console.log(res.rows);
    ctx.helper.body.SUCCESS({ ctx, res: { ...res }, msg: `获取${this.title}列表成功` });
  }

  async show() {
    const { ctx, service } = this;
    const res = await service.article.show(ctx.params.id);
    if (res.__code_wrong) {
      ctx.helper.body.NOT_FOUND({ ctx, msg: '文章不存在' });
    } else {
      ctx.helper.body.SUCCESS({ ctx, res, msg: '获取文章详情成功' });
    }
  }
}

module.exports = ArticleController;
