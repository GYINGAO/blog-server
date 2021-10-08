'use strict';

const BaseService = require('./base');

class UserService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'User';
  }
  async create(payload) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({
      where: { name: payload.name },
    });
    if (res) {
      return {
        __code_wrong: 40001,
        msg: '用户名已存在',
      };
    }
    const { password } = await ctx.helper.tools.saltPassword(payload.password);
    payload.password = password;
    const res_user = await ctx.model.User.create(payload);
    return res_user;
  }
  async update(payload) {
    const { ctx } = this;
    const user = await ctx.model.User.findByPk(payload.id);
    if (!user) {
      return {
        __code_wrong: 40004,
        msg: '用户不存在',
      };
    }
    return await user.update(payload.info);
  }

  async destroy(payload) {
    return await this.ctx.model.User.destroy({ where: { id: payload } });
  }

  async login(payload) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ where: { name: payload.name } });
    if (!user) {
      return {
        __code_wrong: 40004,
        msg: '用户名或密码错误',
      };
    }
    const { password } = await ctx.helper.tools.saltPassword(payload.password);
    if (password !== user.password) {
      return {
        __code_wrong: 40000,
        msg: '用户名或密码错误',
      };
    }
    return await this.handleLogin(ctx, user);
  }

  async handleLogin(ctx, user) {
    // 最后一次登录时间
    const { app } = this;
    user.update({
      last_login: app.dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    const userInfo = { id: user.id, name: user.name };
    return user ? { token: await ctx.helper.tools.createToken(ctx, userInfo) } : null;
  }

  async logout() {
    const { ctx } = this;
    const token = ctx.request.headers.authorization && ctx.request.headers.authorization.split('Bearer ')[1];
    return token;
  }

  async userInfo(token) {
    const { ctx } = this;
    try {
      const res = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      const { id } = res.data;
      const user = ctx.model.User.findByPk(id);

      return user ? user : { __code_wrong: 40004, msg: '用户不存在' };
    } catch (error) {
      if (error.message === 'jwt expired') {
        return {
          __code_wrong: 40003,
          msg: '令牌过期',
        };
      }
    }
  }

  async show(name) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ where: { name } });
    return user ? user : { __code_wrong: 40004, msg: '用户不存在' };
  }
}

module.exports = UserService;
