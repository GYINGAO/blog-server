'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class BaseService extends Service {
  async index(payload) {
    const data = await this.ctx.model[this.model].findAndCountAll(payload);
    return { ...data };
  }

  async create(payload) {
    const { ctx } = this;
    const query = payload.name ? { where: { name: payload.name } } : {};
    const res = await ctx.model[this.model].findOne(query);
    if (res) {
      return {
        __code_wrong: 40001,
        msg: '已存在',
        data: res.name,
      };
    }
    const list = await ctx.model[this.model].create(payload);
    return list;
  }

  async update(payload) {
    const { ctx } = this;
    const entity = await ctx.model[this.model].findByPk(payload.id);
    if (!entity) {
      return {
        __code_wrong: 40004,
      };
    }
    return await entity.update(payload.info);
  }

  async destroy(id) {
    const entity = await this.ctx.model[this.model].findByPk(id);
    if (!entity) {
      return {
        __code_wrong: 400004,
      };
    }
    return await entity.destroy();
  }
}

module.exports = BaseService;
