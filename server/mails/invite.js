import { sendMail, sendMailWithAction } from "./index";
import {clientUrl} from "../config/constants";

export const sendInvitation = (to, name, senderName, senderProfile, maslak, inviteId) => {
  let subject = 'Invitation to join Alimbook';
  let mailContent = {
    title: 'Alimbook Invitation!',
    hiddenMessage: subject,
    message: `Assalaamu Alaikum ${name}, <br/><br/> you have been invited by <a href="${clientUrl}/profile/${senderProfile}">${senderName}</a> to join Alimbook community as a <b style="color:#0F214B;">${maslak} Alim</b>. Alimbook a new kind of <b>social network</b> and <b>knowledge sharing platform</b> for Ummah, under the guidance and moderation of Ulama.<br/><br/> We are very much excited to see you join and share your valuable knowledge & help people understand the Islam better. Click the below link to accept the invitation.`,
    actionTitle: 'Accept Invitation',
    actionUrl: `${clientUrl}/auth/register-alim?invite=${inviteId}`
  }
  sendMailWithAction({ email: to, subject, mailContent });
}

export const invitationAccepted = (email, alimName) => {
  let subject = `${alimName} accepted your invite!`;
  let mailContent = {
    title: 'Invite Accepted!',
    hiddenMessage: subject,
    body: `
<div>
    <p>Alhamdulillah! ${alimName} has accepted your invitation and joined the Alimbook community. May Allah accept our deeds and save us from hell fire.</p>
    <p>Keep inviting other Ulama, so that the river of knowledge keeps flowing.  <a href="${clientUrl}/invite">Invite Ulama</a></p>
</div>`
  }
  sendMail({ email, subject, mailContent });
}
