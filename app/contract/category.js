'use strict';

module.exports = {
  name: {
    type: 'string',
    min: 2,
    max: 60,
    trim: true,
    example: 'Imfdj',
    description: '分类名',
    required: false,
  },
  description: {
    type: 'string',
    description: '描述',
    required: false,
  },
};
