"use strict";

var _deposit = require("./deposit");

var _deposit2 = _interopRequireDefault(_deposit);

var _withdrawal = require("./withdrawal");

var _withdrawal2 = _interopRequireDefault(_withdrawal);

var _index = require("./index");

var _bonus = require("./bonus");

var _token = require("./token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let email = 'nabeel@bidable.in';

// verificationMail({ username: 'nabeel', email, jwt: 'fdsaf'})
// dep(email, 0.5)
// withdraw(email, 0.5, 'fdsa')
// claimApproved(email)
// claimReceived(email)
// referralSPOReceived(email, 'safoora')
// tokenPurchaseMail({ email, token: 'SportEther Bangalore', totalPrice: 0.004, unit: 2, actualCost: 0.04, price: 0.02, discount: 80})

(0, _index.sendMarketingMail)({
  email: 'emaad@bidable.in',
  subject: 'Hello Reader',
  body: `
  <div>
  <p>Hey Reader,</p>
  <p>Thanks for being reader of Bidable, I wanted to share an exclusive information with you regarding real time E-Auction platform wherein you can sell or buy industrial surplus, scraps and recyclables and much more hard to move industrial obstacles.</p>
  
  <p>Stack in much more bundles of cash for your Industrial surplus, scraps and recyclables. 
  Wait is over now. Get Value, Get Bidable.</p>
</div>
  `,
  senderName: 'Emaad Nahed',
  senderDesignation: 'Marketing Manager'
});