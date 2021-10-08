'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('user', '/api/user', controller.user);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.get('/api/user_info', controller.user.userInfo);
  router.post('/api/user/avatar', controller.upload.avatar);

  router.resources('category', '/api/category', controller.category);

  router.resources('tag', '/api/tag', controller.tag);

  router.resources('article', '/api/article', controller.article);
};
