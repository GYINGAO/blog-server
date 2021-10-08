'use strict';

const BaseService = require('./base');
const path = require('path');
const fs = require('fs');

class ArticleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'Article';
  }

  async create(field) {
    const { ctx } = this;
    const article = await ctx.model.Article.create(field);
    await article.createDetail({ content: field.content });
    if (field.category !== 'null') {
      const category = await ctx.model.Category.findByPk(parseInt(field.category));
      await article.setCategory(category);
    }
    if (field.tags && field.tags !== '') {
      const tagsName = field.tags.split(',');
      tagsName.forEach(async item => {
        await ctx.model.Tag.findOrCreate({
          where: {
            name: item,
          },
        });
      });
      const tags = await ctx.model.Tag.findAll({ where: { name: tagsName } });
      await article.setTags(tags);
    }
    return await ctx.model.Article.max('id');
  }

  async show(id) {
    const { ctx } = this;
    const article = await ctx.model.Article.findByPk(id, {
      include: [
        { model: ctx.model.Tag, attributes: ['id', 'name'] },
        { model: ctx.model.Detail, attributes: ['id', 'content'] },
        { model: ctx.model.Category, attributes: ['id', 'name', 'description'] },
      ],
    });
    return article ? article : { __code_wrong: 40004, msg: '文章不存在' };
  }

  async destroy(id) {
    const entity = await this.ctx.model[this.model].findByPk(id);
    if (!entity) {
      return {
        __code_wrong: 400004,
      };
    }
    const coverPath = path.join(this.config.baseDir, 'app', 'public', 'cover');
    fs.readdir(coverPath, function (err, files) {
      if (err) {
        console.warn(err);
      } else {
        // 遍历读取到的文件列表
        files.forEach(function (filename) {
          // 获取当前文件的绝对路径
          const articleId = filename.split('-')[1];
          if (articleId === id) {
            fs.unlinkSync(path.join(coverPath, filename));
          }
        });
      }
    });
    return await entity.destroy();
  }
}

module.exports = ArticleService;
