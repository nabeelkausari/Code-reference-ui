import moment from 'moment';
import { some } from 'lodash';
export default {
  JWT_SECRET: 'd5b665da5a8cf43a1ccba21abdd45f916e4f3cdd3331025e9f72cdadaa09b6f16d07b3b92a35c0458956be038ac7b01c13908df3d57ba56cce3246e4a71089fc94f975f26b4659c9ad1258148713ad6699abf778e858b71070fe5b9d13081df495f3c8e498ffd72e4ab65753fc4429133cd6cc610d275744bf9709539204dcfb1c4357897dc89624e1fc6c09a625ee590119bdc6bb797e88f1390bcaad29d72b293bcc2bc72821967e283bc4bc1cacfd63425a5794cc6c44592dd9f3757b4c65aa9ac76aec48f8a29028543d808c7d2001ef79316e0dbdd27613853ef843bd295021d42a7806c41a75e75b9eab1842d8162ac33d6f6b43ab4d1f4396ff89c7d6',
}

const devUrl = 'http://localhost:3000';
const stagingUrl = 'http://staging.alimbook.com';
const prodUrl = 'https://www.alimbook.com';

export let clientUrl;
export let apiUrl;

switch (process.env.NODE_ENV) {
  case "production":
    clientUrl = prodUrl;
    apiUrl = prodUrl;
    break;
  case "staging":
    clientUrl = stagingUrl;
    apiUrl = prodUrl;
    break;
  default:
    clientUrl = devUrl;
    apiUrl = 'http://localhost:5000';
}

export const getDateTime = (date, time) => {
  let hours = parseInt(time.substr(0, 2));
  let minutes = parseInt(time.substr(2));
  let dateStr = moment(date).format("YYYY-MM-DD");
  return moment(dateStr).hours(hours).minutes(minutes)
}

export const supportEmail = 'support@alimbook.com'
