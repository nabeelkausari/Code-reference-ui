import Referral from '../models/Referral';
import { sendMail } from "./index";

export const sendSignupMails = async user => {
  let { parent } = await Referral.findOne({ userId: user._id }).populate('parent', 'email username').exec();
  if (parent) {
    directReferralSignupMail({ email: parent.email, referralUsername: user.username, referralEmail: user.email });
    referredUserSignupMail({ email: user.email, referrerUsername: parent.username, referrerEmail: parent.email});
    let parentReferrer = await Referral.findOne({ userId: parent }).populate('parent', 'email username').exec();
    if (parentReferrer.parent) {
      indirectReferralSignupMail({ email: parentReferrer.parent.email, indirectUsername: user.username, indirectEmail: user.email, referralUsername: parent.username });
    }
  } else {
    userSignupMail({ email: user.email })
  }
}

const directReferralSignupMail = ({ email, referralUsername, referralEmail }) => {
  let subject = `You have a new direct referral ${referralUsername.toUpperCase()} at SportEther`;
  let mailContent = {
    title: 'New Direct Referral!',
    hiddenMessage: 'You have a new direct referral at SportEther.',
    body: `
<div>
     <p>Congratulations! Your referral <b style="text-transform: capitalize">${referralUsername}</b> has used your referral link to sign up in SportEther.</p>
     <p>If this user joins our social community and claims for bonus, <span style="text-transform: capitalize">${referralUsername}</span> will receive 300 SPO Coins and you will receive <b>200 SPO Coins</b>.</p>
     <p>From now onwards, whatever purchases this user will make you will receive <b>10%</b> of the total sale in Ethereum as referral bonus <b>forever</b>.</p>
     <p>We would like you to assist this user further as he/she is registered under your account. Here is the email address of <span style="text-transform: capitalize">${referralUsername}</span> <a href="mailto:${referralEmail}">${referralEmail}</a> - Congratulations Again!.</p>
     <p>If you have any questions, just reply to this email — we're always happy to help out.</p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}

const indirectReferralSignupMail = ({ email, indirectUsername, indirectEmail, referralUsername }) => {
  let subject = `You have a new indirect referral ${indirectUsername.toUpperCase()} at SportEther`;
  let mailContent = {
    title: 'New InDirect Referral!',
    hiddenMessage: 'You have a new indirect referral at SportEther.',
    body: `
<div>
     <p>Congratulations! Your referral <b style="text-transform: capitalize">${referralUsername}</b> has referred another user <b style="text-transform: capitalize">${indirectUsername}</b> to sign up in SportEther.</p>
     <p>From now onwards, whatever purchases this user will make you will receive <b>1%</b> of the total sale in Ethereum as referral bonus <b>forever</b>.</p>
     <p>However if you would like to assist this user further as he/she is new to SportEther. Here is the email address of <span style="text-transform: capitalize">${indirectUsername}</span> <a href="mailto:${indirectEmail}">${indirectEmail}</a> - Congratulations Again!.</p>
     <p>If you have any questions, just reply to this email — we're always happy to help out.</p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}

const referredUserSignupMail = ({ email, referrerUsername, referrerEmail }) => {
  let subject = 'You have used referral link to signup at SportEther';
  let mailContent = {
    title: 'Well Done and Welcome!',
    hiddenMessage: 'You have used referral link to signup at SportEther!',
    body: `
<div>
    <p>Great!, You have been registered under  <b style="text-transform: capitalize">${referrerUsername}</b> by using the referral link. We are glad to announce about 2 benefits you are about to receive here.</p>
    <ul>
        <li>
            <p><a href="https://www.sportether.com/account/bonus">Join our community</a> and earn <b>300 SPO coins</b> as signup bonus for FREE</p>
            <ul>
                <li>
                    <a href="https://www.facebook.com/sportether">Facebook</a>
                </li>
                <li>
                    <a href="https://twitter.com/sportether">Twitter</a>
                </li>
                <li>
                    <a href="https://t.me/sportether">Telegram</a>
                </li>
            </ul>
        </li>
        <li><a href="https://www.sportether.com/marketplace">Visit our marketplace</a> and grab your favourite team. As you have used a referral link to signup, you will receive <b>5%</b> of the total purchase as money-back bonus <b>forever</b>.</li>
    </ul>
    <p>Incase if you want to get in touch with your referrer, here is the email address of <span style="text-transform: capitalize">${referrerUsername}</span> <a href="mailto:${referrerEmail}">${referrerEmail}</a> - Congratulations Again!.</p>
    <p>If you have any questions, just reply to this email — we're always happy to help out.</p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}

const userSignupMail = ({ email }) => {
  let subject = 'You have successfully signed up at SportEther';
  let mailContent = {
    title: 'Welcome to SportEther!',
    hiddenMessage: 'You have successfully signed up at SportEther!',
    body: `
<div>
    <p>Great!, You have successfully completed the signup process. But wait, your signup bonus is still waiting for you.</p>
    <p><a href="https://www.sportether.com/account/bonus">Join our community</a> and earn <b>300 SPO coins</b> as signup bonus for FREE</p>
    <ul>
        <li>
            <a href="https://www.facebook.com/sportether">Facebook</a>
        </li>
        <li>
            <a href="https://twitter.com/sportether">Twitter</a>
        </li>
        <li>
            <a href="https://t.me/sportether">Telegram</a>
        </li>
    </ul>
    <p>Don't forget to visit our <a href="https://www.sportether.com/marketplace">Marketplace</a> to grab your favorite sport team.</p>
    <p>If you have any questions, just reply to this email — we're always happy to help out.</p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}
