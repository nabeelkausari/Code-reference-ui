'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./admin/index');

var _index2 = _interopRequireDefault(_index);

var _auth = require('../services/auth');

var auth = _interopRequireWildcard(_auth);

var _profile = require('../services/profile');

var profile = _interopRequireWildcard(_profile);

var _alim = require('../services/alim');

var alim = _interopRequireWildcard(_alim);

var _invite = require('../services/invite');

var invite = _interopRequireWildcard(_invite);

var _post = require('../services/post');

var post = _interopRequireWildcard(_post);

var _comment = require('../services/comment');

var comment = _interopRequireWildcard(_comment);

var _vote = require('../services/vote');

var vote = _interopRequireWildcard(_vote);

var _image = require('../services/image');

var image = _interopRequireWildcard(_image);

var _question = require('../services/question');

var question = _interopRequireWildcard(_question);

var _answer = require('../services/answer');

var answer = _interopRequireWildcard(_answer);

var _passport = require('../config/passport');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = '/api';

exports.default = (app, io) => {
  app.post(url + '/register', auth.registerUser);
  app.post(url + '/register-alim', auth.registerAlim);
  app.post(url + '/login', _passport.requireLogin, auth.login);
  app.post(url + '/get-me', auth.getMe);
  app.get(url + '/confirm-email/:jwt', auth.confirmEmail);
  app.post(url + '/resend-email', auth.resendEmail);
  app.post(url + '/request-password-reset', auth.requestPasswordReset);
  app.post(url + '/reset-password', auth.resetPassword);

  // app.post(url + '/forgotPasswordOTP',       auth.forgotPasswordOTP)
  // app.post(url + '/resetPasswordOTP',        auth.resetPasswordOTP)
  // app.get( url + '/checkMobile',             auth.checkMobile)
  // app.get( url + '/checkEmail',              auth.checkEmail)

  app.post(url + '/profile', _passport.requireAuth, profile.updateProfile);
  app.get(url + '/profile', _passport.requireAuth, profile.getProfile);
  app.put(url + '/profile/avatar', _passport.requireAuth, profile.updateAvatar);
  app.get(url + '/profile/posts', _passport.requireAlim, profile.getMyPosts);
  app.get(url + '/profile/answers', _passport.requireAlim, profile.getMyAnswers);
  app.get(url + '/profile/questions', _passport.requireAuth, profile.getMyQuestions);

  app.get(url + '/alim/my-circles', _passport.requireAuth, alim.getMyCircles);
  app.put(url + '/alim/follow', _passport.requireAuth, alim.followAlim);
  app.put(url + '/alim/un-follow', _passport.requireAuth, alim.unFollowAlim);
  app.get(url + '/alim', alim.getUlama);
  app.get(url + '/alim/profile/:alimId', _passport.requireAuth, alim.getAlimProfile);
  app.get(url + '/alim/posts/:alimId', _passport.requireAuth, alim.getAlimPosts);
  app.get(url + '/alim/answers/:alimId', _passport.requireAuth, alim.getAlimAnswers);
  app.param('alimId', alim.alimId);

  app.post(url + '/admin/invite', _passport.requireAdmin, invite.sendInvite);
  app.put(url + '/admin/invite', _passport.requireAdmin, invite.resendInvite);
  app.get(url + '/admin/invite', _passport.requireAdmin, invite.getAllInvites);

  app.post(url + '/invite', _passport.requireAlim, invite.sendInvite);
  app.put(url + '/invite', _passport.requireAlim, invite.resendInvite);
  app.get(url + '/invite', _passport.requireAlim, invite.getMyInvites);
  app.get(url + '/invite/:inviteId', invite.getInvite);
  app.param('inviteId', invite.inviteId);

  app.post(url + '/post', _passport.requireAlim, post.createPost);
  app.get(url + '/post', _passport.requireAuth, post.getPosts);
  app.put(url + '/post/vote', _passport.requireAuth, (req, res, next) => post.addVoteToPost(req, res, next, io));
  app.put(url + '/post/remove-vote', _passport.requireAuth, (req, res, next) => post.removeVoteFromPost(req, res, next, io));

  app.get(url + '/comment/:postId', _passport.requireAuth, comment.getPostComments);
  app.post(url + '/comment/:postId', _passport.requireAuth, (req, res, next) => comment.addPostComment(req, res, next, io));
  app.delete(url + '/comment/:postId/:commentId', _passport.requireAuth, (req, res, next) => comment.removePostComment(req, res, next, io));
  app.param('commentId', comment.commentId);
  app.param('postId', comment.postId);

  app.post(url + '/comment-vote/:commentId', _passport.requireAuth, (req, res, next) => vote.addVoteToComment(req, res, next, io));
  app.delete(url + '/comment-vote/:commentId', _passport.requireAuth, (req, res, next) => vote.removeVoteFromComment(req, res, next, io));
  app.post(url + '/answer-vote/:answerId', _passport.requireAuth, (req, res, next) => vote.addVoteToAnswer(req, res, next, io));
  app.delete(url + '/answer-vote/:answerId', _passport.requireAuth, (req, res, next) => vote.removeVoteFromAnswer(req, res, next, io));

  app.get(url + '/image/:imageId', image.getImage);
  app.param('imageId', image.imageId);

  app.post(url + '/question', _passport.requireAuth, question.createQuestion);
  app.get(url + '/question-answered', question.getAnsweredQuestions);
  app.get(url + '/question-answered/:answeredQuestionId', question.getAnsweredQuestion);
  app.get(url + '/question', _passport.requireAlim, question.getQuestions);
  app.get(url + '/question/:questionId', _passport.requireAlim, question.getQuestion);
  app.param('answeredQuestionId', question.answeredQuestionId);
  app.param('questionId', question.questionId);

  app.post(url + '/answer', _passport.requireAlim, answer.createAnswer);
  app.get(url + '/answers/:questionId', _passport.requireAlim, answer.getAnswers);
  app.get(url + '/answer/:answerId', _passport.requireAlim, answer.getAnswer);
  app.param('answerId', answer.answerId);

  // adminApis(app, url);
};