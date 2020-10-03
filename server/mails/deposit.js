import { sendMail } from "./index";

export default (email, amount) => {
  let subject = 'Your ETH deposit is complete!';
  let mailContent = {
    title: 'Deposit Completed!',
    hiddenMessage: 'Your ETH deposit is complete!',
    body: `
<div>
     <p>A deposit of <b>${amount} ETH</b> to Your SportEther account has been completed!</p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}
