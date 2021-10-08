'use strict';

const BaseController = require('./base');
const rule = require('../contract/user');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
    this.title = '用户';
    this.rule = rule;
  }

  /**
   * 删除用户
   */
  async destroy() {
    const { ctx, service } = this;
    const res = await service.user.destroy(ctx.params.id);
    if (res.__code_wrong) {
      ctx.helper.body.NOT_FOUND({ ctx, msg: `${this.title}不存在` });
    } else {
      ctx.helper.body.NO_CONTENT({ ctx, res });
    }
  }

  /**
   * 获取本人信息(token)
   */
  async userInfo() {
    const { ctx, service } = this;
    if (!ctx.request.headers.authorization) {
      return ctx.helper.body.UNAUTHORIZED({ ctx });
    }
    const token = ctx.request.headers.authorization.split('Bearer ')[1];
    const res = await service.user.userInfo(token);
    switch (res.__code_wrong) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res, msg: '获取个人信息成功' });
        break;
      case 40003:
        ctx.helper.body.UNAUTHORIZED({ ctx, msg: res.msg });
        break;
      case 40004:
        ctx.helper.body.NOT_FOUND({ ctx, msg: res.msg });
        break;
      default:
        ctx.helper.body.UNAUTHORIZED({ ctx });
        break;
    }
  }

  /**
   * 获取指定用户信息(name)
   */
  async show() {
    const { ctx, service } = this;
    ctx.validate(this.rule, ctx.params);
    const res = await service.user.show(ctx.params.id);
    if (res.__code_wrong && res.__code_wrong === 40004) {
      ctx.helper.body.NOT_FOUND({ ctx, msg: res.msg });
    } else {
      ctx.helper.body.SUCCESS({ ctx, res });
    }
  }

  /**
   * 登录
   */
  async login() {
    const { ctx, service } = this;

    ctx.validate(this.rule, ctx.request.body);
    const res = await service.user.login(ctx.request.body);
    switch (res.__code_wrong) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res, msg: '登录成功' });
        break;
      case 40000:
        ctx.helper.body.INVALID_REQUEST({
          ctx,
          code: res.__code_wrong,
          msg: res.msg,
        });
        break;
      case 40004:
        ctx.helper.body.INVALID_REQUEST({
          ctx,
          code: res.__code_wrong,
          msg: res.msg,
        });
        break;

      default:
        ctx.helper.body.UNAUTHORIZED({ ctx });
        break;
    }
  }

  /**
   * 退出登录
   */
  async logout() {
    const { ctx, service } = this;
    const res = await service.user.logout();
    ctx.helper.body.SUCCESS({ ctx, res, msg: '退出登录成功' });
  }
}

module.exports = UserController;
