'use strict';

module.exports = {
  title: {
    type: 'string',
    min: 2,
    max: 60,
    trim: true,
    example: 'Imfdj',
    description: '分类名',
    required: false,
  },
  summary: {
    type: 'string',
    description: '描述',
    required: false,
  },
  top_flag: {
    type: 'enum',
    required: false,
    values: [0, 1],
    description: '是否置顶',
  },
};
