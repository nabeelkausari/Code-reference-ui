import { getUsers } from './users';
import { addCategory } from "./categories"
import {requireAdmin, requireAdminLogin} from '../../config/passport';
import {adminLogin} from "./auth"
import { sendMarketingMail, getMails } from "./marketing";

export default (server, baseUrl) => {
  // admin routes
  let preText = baseUrl + '/admin';
  server.post(preText + '/login', requireAdminLogin, adminLogin)

  server.get(preText + '/getUsers', requireAdmin, getUsers)
  server.post(preText + '/categories', requireAdmin, addCategory)

  server.post(preText + '/mails', requireAdmin, sendMarketingMail)
  server.get(preText + '/mails', requireAdmin, getMails)
}

