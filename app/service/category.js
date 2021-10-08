'use strict';

const BaseService = require('./base');

class CategoryService extends BaseService {
  constructor(...args) {
    super(...args);
    this.model = 'Category';
  }
}

module.exports = CategoryService;
