'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async avatar() {
    const { ctx, service } = this;
    const stream = await ctx.getFileStream();
    const res = await service.upload.avatar(stream);
    switch (res.__code_wrong) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, msg: null, res });
        break;
      case 40004:
        ctx.helper.body.NOT_FOUND({ ctx, msg: res.msg });
        break;
      default:
        ctx.helper.body.INVALID_REQUEST({ ctx, msg: res.msg });
        break;
    }
  }
}

module.exports = UploadController;
