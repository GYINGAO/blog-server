'use strict';

const Controller = require('egg').Controller;
const { Op } = require('sequelize');

class BaseController extends Controller {
  /**
   * 查
   */
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
    const res = await service[this.entity].index(query);
    ctx.helper.body.SUCCESS({ ctx, res: { ...res }, msg: `获取${this.title}列表成功` });
  }

  /**
   * 增
   */
  async create() {
    const { ctx, service } = this;
    ctx.validate(this.rule, ctx.request.body);
    console.log(ctx.request.body);
    const res = await service[this.entity].create(ctx.request.body);
    if (!res.__code_wrong) {
      ctx.helper.body.CREATED_UPDATE({ ctx, msg: `创建${this.title}成功`, res: res.dataValues });
    } else {
      ctx.helper.body.INVALID_REQUEST({ ctx, code: res.__code_wrong, msg: `${this.title}'${res.data}'已存在` });
    }
  }

  /**
   * 改
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(this.rule, ctx.request.body);
    const res = await service[this.entity].update({ id: ctx.params.id, info: { ...ctx.request.body } });
    switch (res.__code_wrong) {
      case undefined:
        ctx.helper.body.CREATED_UPDATE({ ctx, msg: '修改成功' });
        break;
      case 40004:
        ctx.helper.body.NOT_FOUND({ ctx, msg: `${this.title}不存在` });
        break;
      default:
        ctx.helper.body.INVALID_REQUEST({ ctx, msg: '修改失败' });
        break;
    }
  }

  /**
   * 删
   */
  async destroy() {
    const { ctx, service } = this;
    const res = await service[this.entity].destroy(ctx.params.id);
    if (res.__code_wrong) {
      ctx.helper.body.NOT_FOUND({ ctx, msg: `${this.title}不存在` });
    } else {
      ctx.helper.body.NO_CONTENT({ ctx });
    }
  }
}

module.exports = BaseController;
