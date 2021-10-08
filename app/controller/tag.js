'use strict';

const BaseController = require('./base');
const rule = require('../contract/tag');

class TagController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'tag';
    this.title = '标签';
    this.rule = rule;
  }
}

module.exports = TagController;
