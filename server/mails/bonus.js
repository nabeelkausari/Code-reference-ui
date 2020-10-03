import { sendMail } from "./index";

export const claimReceivedMail = (email) => {
  let subject = 'Bonus claim received and will be processed in short!';
  let mailContent = {
    title: 'Bonus Claimed!',
    hiddenMessage: subject,
    body: `
<div>
    <p>Thanks for joining our community! We have received your bonus claim for <b>300 SPO coins</b>, our team is verifying it and will be processed within 2 working days.</p>
    
    <p><i>Note: We request you to stay connected with our channels (Facebook, Twitter, Telegram) and not to exit from any of it. We may restrict withdrawals of bonus coins for those who had left our community.</i></p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}

export const claimApprovedMail = (email) => {
  let subject = 'Bonus claim approved and SPO coins are in you wallet!';
  let mailContent = {
    title: 'Bonus Approved!',
    hiddenMessage: subject,
    body: `
<div>
    <p>Congratulations! We have verified your presence in our social community and we are very thankful to it. As a reward to joining our community, we have added <b>300 SPO coins</b> to your wallet.</p>
    <p>Journey doesn't ends here, visit our <a href="https://sportether.com/marketplace">Marketplace</a> and grab your favorite sports team before it's too late. Because only <b>One Lucky Person out of 1 Million Fans</b> can hold the team token.</p>
   
    <p>Invite your friends and earn more SPO coins and <b>Ethers</b> as well. Checkout our <a href="https://sportether.com/referral-program">Referral Program</a> for more details</p>
    <p><i>Note: We request you to stay connected with our channels (Facebook, Twitter, Telegram) and not to exit from any of it. We may restrict withdrawals of bonus coins for those who had left our community.</i></p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}

export const referralSPOReceivedMail = (email, username) => {
  let subject = `You and your friend ${username.toUpperCase()} had received Bonus SPO Coins!`;
  let mailContent = {
    title: 'Referral SPO Received!',
    hiddenMessage: subject,
    body: `
<div>
    <p>Hurray! You have received <b>200 SPO Coins</b> as a referral bonus for inviting your friend ${username} to join SportEther.</p>
    <p>Happy Inviting! Checkout our <a href="https://sportether.com/referral-program">Referral Program</a> for more details</p>
    <p><i>Note: We request you to stay connected with our channels (Facebook, Twitter, Telegram) and not to exit from any of it. We may restrict withdrawals of bonus coins for those who had left our community.</i></p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}
