"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeParticipant = exports.updateEtherFund = exports.updateTokenFund = exports.isUserParticipant = exports.userCanExit = exports.userCanWithdraw = exports.isGroundOpen = exports.checkOpponent = undefined;

var _Ground = require("../models/Ground");

var _Ground2 = _interopRequireDefault(_Ground);

var _Wallet = require("../models/Wallet");

var _Wallet2 = _interopRequireDefault(_Wallet);

var _Fund = require("../models/Fund");

var _Fund2 = _interopRequireDefault(_Fund);

var _Participation = require("../models/Participation");

var _Participation2 = _interopRequireDefault(_Participation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const checkOpponent = exports.checkOpponent = (ground, opponentSide, userId) => {
  if (ground[opponentSide].user && ground[opponentSide].user.toString() === userId) {
    throw "User can't be an opponent of itself";
  }
};

const isGroundOpen = exports.isGroundOpen = (() => {
  var _ref = _asyncToGenerator(function* (groundId) {
    let ground = yield _Ground2.default.findOne({ _id: groundId }).populate('match').exec();
    if (!ground.open) throw 'Ground is closed';
    return ground;
  });

  return function isGroundOpen(_x) {
    return _ref.apply(this, arguments);
  };
})();

const userCanWithdraw = exports.userCanWithdraw = (() => {
  var _ref2 = _asyncToGenerator(function* (groundId) {
    let ground = yield _Ground2.default.findOne({ _id: groundId }).populate('match').exec();
    if (!ground.canWithdraw) {
      throw "Can't withdraw funds from ground, either you found a pair or match is live";
    }
    return ground;
  });

  return function userCanWithdraw(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const userCanExit = exports.userCanExit = (() => {
  var _ref3 = _asyncToGenerator(function* (groundId) {
    let ground = yield _Ground2.default.findOne({ _id: groundId }).populate('match').exec();
    if (!ground.canExit) {
      throw "Can't exit from ground, you have found a pair";
    }
    return ground;
  });

  return function userCanExit(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const isUserParticipant = exports.isUserParticipant = (() => {
  var _ref4 = _asyncToGenerator(function* (ground, userId) {
    let teamSide;
    if (ground.teamA.user && ground.teamA.user.toString() === userId) {
      teamSide = "teamA";
    } else if (ground.teamB.user && ground.teamB.user.toString() === userId) {
      teamSide = "teamB";
    } else throw 'User is not a participant';
    return teamSide;
  });

  return function isUserParticipant(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
})();

const updateTokenFund = exports.updateTokenFund = (() => {
  var _ref5 = _asyncToGenerator(function* (userId, tokenId, add) {
    let tokenFund = yield _Fund2.default.findOne({ userId, tokenId }).exec();
    if (!tokenFund) throw "User has no token records";

    let balance = parseInt(tokenFund.balance);
    let tokenNewBalance = add ? balance + 1 : balance - 1;
    yield tokenFund.update({ balance: tokenNewBalance });
    return tokenNewBalance;
  });

  return function updateTokenFund(_x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
})();

const updateEtherFund = exports.updateEtherFund = (() => {
  var _ref6 = _asyncToGenerator(function* (userId, unit, add) {
    let wallet = yield _Wallet2.default.findOne({ userId }).exec();
    if (!wallet) throw "User has no wallet";

    let balance = parseInt(wallet.ethBalance);
    let ethNewBalance = add ? balance + unit : balance - unit;
    yield wallet.update({ ethBalance: ethNewBalance });
    return ethNewBalance;
  });

  return function updateEtherFund(_x9, _x10, _x11) {
    return _ref6.apply(this, arguments);
  };
})();

const removeParticipant = exports.removeParticipant = (() => {
  var _ref7 = _asyncToGenerator(function* (userId, groundId) {
    let participation = yield _Participation2.default.findOne({ userId }).exec();
    let groundIndex = participation.grounds.indexOf(groundId);
    yield participation.update({ grounds: [...participation.grounds.slice(0, groundIndex), ...participation.grounds.slice(groundIndex + 1)] });
    return true;
  });

  return function removeParticipant(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
})();