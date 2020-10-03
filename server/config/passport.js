import passport from 'passport';

import constants from './constants';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import Account from "../models/Account"

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    let account = await Account.findOne({ email })
      .populate('alim user')
      .exec();
    if (!account) return done(null, false, { message: 'Incorrect username.' });
    if (!account.confirmed) return done(null, false, { message: 'Email not confirmed yet' });

    account.comparePassword(password, (err, isMatch) => {
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

      return done(null, account);
    });

  } catch (err) {
    return done(err)
  }
})

const adminLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    let account = await Account.findOne({ email })
      .populate('alim user').exec();
    if (!account) return done(null, false);
    if (!account.isAdmin) done(null, false)

    account.comparePassword(password, (err, isMatch) => {
      if (!isMatch) return done(null, false);

      return done(null, account);
    });

  } catch (err) {
    return done(err)
  }
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: constants.JWT_SECRET
};

// Create JWT strategy
const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
  try {
    const account = await Account.findById(payload.sub)
      .populate('alim user').exec();
    if (account) done(null, account)
    else done(null, false)
  } catch (err) {
    return done(err, false)
  }
});

// Create Admin JWT strategy
const adminJWT = new Strategy(jwtOptions, async (payload, done) => {
  try {
    const account = await Account.findById(payload.sub)
      .populate('alim user').exec();
    if (!account) return done(null, false);
    if (account.isAdmin) done(null, account)
    else done(null, false)
  } catch (err) {
    return done(err, false)
  }
});

// Create Alim JWT strategy
const alimJWT = new Strategy(jwtOptions, async (payload, done) => {
  try {
    const account = await Account.findById(payload.sub)
      .populate('alim user').exec();
    if (!account) return done(null, false);
    if (account.isAlim) done(null, account)
    else done(null, false)
  } catch (err) {
    return done(err, false)
  }
});

export default (app) => {
  app.use(passport.initialize({ userProperty: 'account' }))
  passport.use('jwt', jwtLogin);
  passport.use('local', localLogin);
  passport.use('admin-jwt', adminJWT);
  passport.use('admin-login', adminLogin);
  passport.use('alim-jwt', alimJWT);
}

export const requireAuth = passport.authenticate('jwt', { session: false })
export const requireLogin = passport.authenticate('local', { session: false })
export const requireAdmin = passport.authenticate('admin-jwt', { session: false })
export const requireAdminLogin = passport.authenticate('admin-login', { session: false })
export const requireAlim = passport.authenticate('alim-jwt', { session: false })
