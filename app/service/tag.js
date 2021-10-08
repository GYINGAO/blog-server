'use strict';

const BaseService = require('./base');

class TagService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'Tag';
  }
}

module.exports = TagService;
