'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users');

var _categories = require('./categories');

var _passport = require('../../config/passport');

var _auth = require('./auth');

var _marketing = require('./marketing');

exports.default = (server, baseUrl) => {
  // admin routes
  let preText = baseUrl + '/admin';
  server.post(preText + '/login', _passport.requireAdminLogin, _auth.adminLogin);

  server.get(preText + '/getUsers', _passport.requireAdmin, _users.getUsers);
  server.post(preText + '/categories', _passport.requireAdmin, _categories.addCategory);

  server.post(preText + '/mails', _passport.requireAdmin, _marketing.sendMarketingMail);
  server.get(preText + '/mails', _passport.requireAdmin, _marketing.getMails);
};