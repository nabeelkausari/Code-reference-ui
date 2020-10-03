import User from "../../models/User"
import { tokenForUser } from "../../services/auth";

export const adminLogin = async (req, res, next) => {
  let { email, firstName, lastName, confirmed, isAdmin } = req.user;
  res.send({ jwt: tokenForUser(req.user), user: { email, firstName, lastName, confirmed, isAdmin } });
}

export const makeAdmin = async (req, res, next) => {
  try {
    const { email, mailDetails } = req.body;
    if (!email) {
      return res.status(422).send({ error: `Email is required`});
    }
    if (!mailDetails) {
      return res.status(422).send({ error: `Mail details are required`});
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser.isAdmin) {
      return res.status(422).send({ error: 'User is already an Admin'});
    }

    const adminUser = await existingUser
      .update({ buyer: false, seller: false, isAdmin: true, mailDetails }, { new: true })
      .exec();

    res.json({ adminUser })
  } catch (err) {
    return next(err)
  }
}
