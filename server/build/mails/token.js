'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.indirectEtherBonusMail = exports.directEtherBonusMail = exports.tokenPurchaseMail = exports.tokenPurchaseWithBonusMail = undefined;

var _index = require('./index');

let tableStyle = `style="width: 100%; margin-bottom: 40px;"`;
let tdRightStyle = `align="right" style="font-weight: 700"`;
let trStyle = `style="width: 100%; border-bottom:1px solid #dbdbdb;"`;
let thStyle = `style="padding: 10px 30px 10px 30px;"`;
let tdStyle = `width: 50%; padding: 10px 20px 10px 20px; color: #666666; font-family: 'Exo 2', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; line-height: 25px;`;
let highlight = `background: #f4f4f4; font-weight: 400; color: #444444;`;

let purchaseTable = ({ token, symbol, unit, price, totalPrice, discount, actualCost }) => `
<table ${tableStyle}>
  <thead>
    <tr ${trStyle}>
      <th ${thStyle} colspan="2">Your Purchase Details</th>
    </tr>
  </thead>
  <tbody>
    <tr ${trStyle}>
        <td style="${tdStyle}">Team Token</td>
        <td style="${tdStyle}" ${tdRightStyle}>SportEther ${token}</td>
    </tr>
    <tr ${trStyle}>
        <td style="${tdStyle}">Symbol</td>
        <td style="${tdStyle}; font-weight: 700" ${tdRightStyle}>${symbol.substr(0, 2)}<span style="color: #c12a2e">${symbol.substr(2)}</span></td>
    </tr>
    <tr ${trStyle}>
        <td style="${tdStyle}">Units</td>
        <td style="${tdStyle}" ${tdRightStyle}>${unit}</td>
    </tr>
    <tr ${trStyle}>
        <td style="${tdStyle}">Price</td>
        <td style="${tdStyle}" ${tdRightStyle}>${price} ETH</td>
    </tr>
    <tr ${trStyle}>
        <td style="${tdStyle}">Total Price (Price x Unit)</td>
        <td style="${tdStyle}" ${tdRightStyle}>${totalPrice} ETH</td>
    </tr>
    <tr ${trStyle}>
        <td style="${tdStyle}">Discount</td>
        <td style="${tdStyle}" ${tdRightStyle}>${discount}%</td>
    </tr>
    <tr ${trStyle}>
        <td style="${tdStyle}${highlight}">You paid (Total Price - Discount)</td>
        <td style="${tdStyle}${highlight}" ${tdRightStyle}>${actualCost} ETH</td>
    </tr>
  </tbody>
</table>`;

let bonusTable = ({ bonusPercent, bonusValue }) => `
<table ${tableStyle}>
    <thead>
      <tr ${trStyle}>
        <th ${thStyle} colspan="2">Bonus Details</th>
      </tr>
    </thead>
    <tbody>
      <tr ${trStyle}>
          <td style="${tdStyle}">Bonus Percent</td>
          <td style="${tdStyle}" ${tdRightStyle}>${bonusPercent}%</td>
      </tr>
      <tr ${trStyle}>
          <td style="${tdStyle}${highlight}">Bonus Received</td>
          <td style="${tdStyle}${highlight}" ${tdRightStyle}>${bonusValue} ETH</td>
      </tr>
    </tbody>
</table>`;

let referralCall = `<p>Checkout our <a href="https://sportether.com/referral-program">Referral Program</a> for more details.</p>`;

const tokenPurchaseWithBonusMail = exports.tokenPurchaseWithBonusMail = options => {
    let { email, token, symbol, unit, price, totalPrice, discount, actualCost, bonusPercent, bonusValue } = options;
    let subject = `You have purchased ${unit} SportEther ${token} Team ${unit > 1 ? 'Tokens' : 'Token'}!`;
    let mailContent = {
        title: 'Token Purchased!',
        hiddenMessage: subject,
        body: `
<div>
    <p>You have made a successful Team Token purchase!</p>
    ${purchaseTable({ token, symbol, unit, price, totalPrice, discount, actualCost })}
    ${bonusTable({ bonusPercent, bonusValue })}
    <p><i>Note: You are receiving bonus on purchase because you have signed up using a referral link.</i></p>
    ${referralCall}
</div>`
    };
    (0, _index.sendMail)({ email, subject, mailContent });
};

const tokenPurchaseMail = exports.tokenPurchaseMail = ({ email, token, symbol, unit, price, totalPrice, discount, actualCost }) => {
    let subject = `You have purchased ${unit} SportEther ${token} Team ${unit > 1 ? 'Tokens' : 'Token'}!`;
    let mailContent = {
        title: 'Token Purchased!',
        hiddenMessage: subject,
        body: `
<div>
    <p>You have made a successful Team Token purchase!</p>
    ${purchaseTable({ token, symbol, unit, price, totalPrice, discount, actualCost })}
    <p>Earn ethers on your friends purchases by inviting them to SportEther through your referral link.</p>
    ${referralCall}
</div>`
    };
    (0, _index.sendMail)({ email, subject, mailContent });
};
const directEtherBonusMail = exports.directEtherBonusMail = ({ email, bonusPercent, bonusValue, friend }) => {
    let subject = `You have received ${bonusValue} Ether Bonus!`;
    let mailContent = {
        title: 'Ether Bonus Received!',
        hiddenMessage: subject,
        body: `
<div>
    <p>You have been rewarded with ethers, because your friend <b style="text-transform: capitalize">${friend}</b> has made a successful Team Token purchase!</p>
    ${bonusTable({ bonusPercent, bonusValue })}
    <p>Invite more friends to earn more ethers through your referral link.</p>
    ${referralCall}
</div>`
    };
    (0, _index.sendMail)({ email, subject, mailContent });
};
const indirectEtherBonusMail = exports.indirectEtherBonusMail = ({ email, bonusPercent, bonusValue, friend, friendsFriend }) => {
    let subject = `You have received ${bonusValue} Ether Bonus!`;
    let mailContent = {
        title: 'Indirect Ether Bonus Received!',
        hiddenMessage: subject,
        body: `
<div>
    <p>You have been rewarded with ethers, because your friend <b style="text-transform: capitalize">${friend}'s</b> referral <b style="text-transform: capitalize">${friendsFriend}</b> has made a successful Team Token purchase!</p>
    ${bonusTable({ bonusPercent, bonusValue })}
    <p>Invite more friends to earn more ethers through your referral link.</p>
    ${referralCall}
</div>`
    };
    (0, _index.sendMail)({ email, subject, mailContent });
};