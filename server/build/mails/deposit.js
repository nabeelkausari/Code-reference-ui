'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

exports.default = (email, amount) => {
  let subject = 'Your ETH deposit is complete!';
  let mailContent = {
    title: 'Deposit Completed!',
    hiddenMessage: 'Your ETH deposit is complete!',
    body: `
<div>
     <p>A deposit of <b>${amount} ETH</b> to Your SportEther account has been completed!</p>
</div>`
  };
  (0, _index.sendMail)({ email, subject, mailContent });
};