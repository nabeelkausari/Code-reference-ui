import { sendMail } from "./index";

export default (email, amount, txnId) => {
  let subject = 'Your ETH withdrawal is in process!';
  let mailContent = {
    title: 'Withdrawal in Process!',
    hiddenMessage: 'Your ETH withdrawal is in process!',
    body: `
<div>
     <p>A withdrawal request of <b>${amount} ETH</b> from Your SportEther account is currently being processed! To know about the expected time for withdrawals to complete, please <a href="https://etherscan.io/tx/${txnId}">click here</a>.</p>
     <p>If you did not place this withdrawal request, please contact our support team immediately by replying to this email.</p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}
