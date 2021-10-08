'use strict';

const BaseController = require('./base');
const rule = require('../contract/category');

class CategoryController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'category';
    this.title = '分类';
    this.rule = rule;
  }
}

module.exports = CategoryController;
