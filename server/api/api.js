import adminApis from './admin/index';
import * as auth from "../services/auth"
import * as profile from '../services/profile';
import * as alim from '../services/alim';
import * as invite from '../services/invite';
import * as post from '../services/post';
import * as comment from '../services/comment';
import * as vote from '../services/vote';
import * as image from '../services/image';
import * as question from '../services/question';
import * as answer from '../services/answer';
import * as setting from '../services/setting';
import * as ijaza from '../services/ijaza';
import {requireAdmin, requireAlim, requireAuth, requireLogin} from "../config/passport"

const url = '/api'

export default (app, io) => {
  app.get(url + '/ping',                     auth.ping)
  app.post(url + '/register',                auth.registerUser)
  app.post(url + '/register-alim',           auth.registerAlim)
  // app.post(url + '/login',     requireLogin, auth.login)
  app.post(url + '/login',                   auth.login)
  app.post(url + '/get-me',                  auth.getMe)
  app.get( url + '/confirm-email/:jwt',      auth.confirmEmail)
  app.post(url + '/resend-email',            auth.resendEmail)
  app.post(url + '/request-password-reset',  auth.requestPasswordReset)
  app.post(url + '/reset-password',          auth.resetPassword)

  // app.post(url + '/forgotPasswordOTP',       auth.forgotPasswordOTP)
  // app.post(url + '/resetPasswordOTP',        auth.resetPasswordOTP)
  // app.get( url + '/checkMobile',             auth.checkMobile)
  // app.get( url + '/checkEmail',              auth.checkEmail)

  app.post(url + '/profile',           requireAuth, profile.updateProfile);
  app.get( url + '/profile',           requireAuth, profile.getProfile);
  app.put( url + '/profile/avatar',    requireAuth, profile.updateAvatar);
  app.get( url + '/profile/posts',     requireAlim, profile.getMyPosts);
  app.get( url + '/profile/answers',   requireAlim, profile.getMyAnswers);
  app.get( url + '/profile/questions', requireAuth, profile.getMyQuestions);

  app.get(url + '/alim/my-circles', requireAuth,      alim.getMyCircles)
  app.get(url + '/alim/my-followings', requireAuth,   alim.getMyFollowings)
  app.put(url + '/alim/follow',     requireAuth,      alim.followAlim)
  app.put(url + '/alim/un-follow',  requireAuth,      alim.unFollowAlim)
  app.get(url + '/alim',            requireAuth,      alim.getUlama)
  app.get(url + '/alim/profile/:alimId', requireAuth, alim.getAlimProfile)
  app.get(url + '/alim/posts/:alimId', requireAuth,   alim.getAlimPosts)
  app.get(url + '/alim/answers/:alimId', requireAuth, alim.getAlimAnswers)
  app.param('alimId', alim.alimId);

  app.post(url + '/admin/invite', requireAdmin, invite.sendInvite);
  app.put( url + '/admin/invite', requireAdmin, invite.resendInvite);
  app.get( url + '/admin/invite', requireAdmin, invite.getAllInvites);

  app.post(url + '/invite', requireAlim, invite.sendInvite);
  app.put( url + '/invite', requireAlim, invite.resendInvite);
  app.get( url + '/invite', requireAlim, invite.getMyInvites);
  app.get( url + '/invite/:inviteId',    invite.getInvite);
  app.param('inviteId', invite.inviteId)

  app.post(url + '/ijaza', requireAlim, ijaza.requestIjaza);
  app.put( url + '/ijaza-transfer/:ijazaId', requireAlim, ijaza.transferIjazaReview);
  app.put( url + '/ijaza-review/:ijazaId', requireAlim, ijaza.reviewIjaza);
  app.put( url + '/ijaza-approve/:ijazaId', requireAlim, ijaza.approveIjaza);
  app.put( url + '/ijaza-reject/:ijazaId', requireAlim, ijaza.rejectIjaza);
  app.put( url + '/ijaza-hold/:ijazaId', requireAlim, ijaza.holdIjaza);
  app.put( url + '/ijaza-cancel/:ijazaId', requireAlim, ijaza.cancelIjaza);

  app.get( url + '/ijaza', requireAlim, ijaza.getIjazaRequests);
  app.get( url + '/ijaza-recent', requireAlim, ijaza.getRecentIjazaRequests);
  app.get( url + '/ijaza-mine', requireAlim, ijaza.getMyIjazaRequests);
  app.get( url + '/ijaza/:ijazaId',    ijaza.getIjaza);
  app.param('ijazaId', ijaza.ijazaId)

  app.post(url + '/settings', requireAuth, setting.createSettings);
  app.put( url + '/settings', requireAuth, setting.updateSettings);
  app.get( url + '/settings', requireAuth, setting.getSettings);

  app.post( url + '/meta', requireAuth, post.extractMeta);
  app.post(url + '/post', requireAlim, post.createPost);
  app.get( url + '/post', requireAuth, post.getPosts);
  app.put( url + '/post/vote', requireAuth, (req, res, next) => post.addVoteToPost(req, res, next, io));
  app.put( url + '/post/remove-vote', requireAuth, (req, res, next) => post.removeVoteFromPost(req, res, next, io));

  app.get(   url + '/comment/:postId', requireAuth, comment.getPostComments);
  app.post(  url + '/comment/:postId', requireAuth, (req, res, next) => comment.addPostComment(req, res, next, io));
  app.delete(url + '/comment/:postId/:commentId', requireAuth, (req, res, next) => comment.removePostComment(req, res, next, io));
  app.param('commentId', comment.commentId);
  app.param('postId', comment.postId);

  app.post(  url + '/comment-vote/:commentId',  requireAuth, (req, res, next) => vote.addVoteToComment(req, res, next, io));
  app.delete(url + '/comment-vote/:commentId',  requireAuth, (req, res, next) => vote.removeVoteFromComment(req, res, next, io));
  app.post(  url + '/answer-vote/:answerId',    requireAuth, (req, res, next) => vote.addVoteToAnswer(req, res, next, io));
  app.delete(url + '/answer-vote/:answerId',    requireAuth, (req, res, next) => vote.removeVoteFromAnswer(req, res, next, io));

  app.get(url + '/image/:imageId', image.getImage);
  app.param('imageId', image.imageId);

  app.post(url + '/question', requireAuth,                question.createQuestion);
  app.get( url + '/question-answered',                    question.getAnsweredQuestions);
  app.get( url + '/question-answered/:answeredQuestionId',question.getAnsweredQuestion);
  app.get( url + '/question', requireAlim,                question.getQuestions);
  app.get( url + '/question/:questionId', requireAlim,    question.getQuestion);
  app.param('answeredQuestionId',                         question.answeredQuestionId)
  app.param('questionId',                                 question.questionId)

  app.post(url + '/answer', requireAlim,              answer.createAnswer);
  app.get( url + '/answers/:questionId', requireAlim, answer.getAnswers);
  app.get( url + '/answer/:answerId', requireAlim,    answer.getAnswer);
  app.param('answerId', answer.answerId)

  // adminApis(app, url);
}
