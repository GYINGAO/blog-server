'use strict';

module.exports = {
  name: {
    type: 'string',
    min: 2,
    max: 60,
    trim: true,
    example: 'Imfdj',
    description: '用户名',
    required: false,
  },
  birthday: {
    type: 'string',
    description: '出生日期',
    required: false,
  },
  nickname: {
    type: 'string',
    min: 2,
    max: 60,
    trim: true,
    example: 'dj',
    description: '昵称',
    required: false,
  },
  password: {
    type: 'string',
    min: 6,
    max: 30,
    trim: true,
    example: '123123',
    description: '用户密码',
    required: false,
  },
  email: {
    type: 'email',
    trim: true,
    example: '1@qq.com',
    description: '邮箱',
    required: false,
  },
  phone: {
    type: 'string',
    min: 11,
    max: 15,
    format: /^(?:(?:\+|00)86)?1\d{10}$/,
    example: '18836366969',
    description: '手机号',
    required: false,
  },
  avatar: {
    type: 'string',
    trim: true,
    example: '',
    description: '头像url',
    required: false,
  },
  gender: {
    type: 'enum',
    values: [0, 1],
    required: false,
  },
};
