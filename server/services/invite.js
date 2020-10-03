import { some, find } from 'lodash';
import mongoose from 'mongoose';

import Invite from "../models/Invite"
import {sendInvitation} from "../mails/invite"
import Alim from "../models/Alim"

export const sendInvite = async (req, res) => {
  try {
    const { to, name, maslak } = req.body;
    if (!name) throw "Provide the name of alim"
    if (!to) throw "Provide the email address to send the invite"

    let sender;
    let allowedMaslak;
    if (req.account.isAdmin) {
      sender = { fullName: 'Alimbook Team', _id: 'admin' }
      if (!maslak) throw "Provide the maslak";
      allowedMaslak = maslak;
    } else {
      sender = await Alim.findById(req.account.alim).lean().exec()
      allowedMaslak = sender.maslak;
    }

    let invite = await new Invite({
      to, name, maslak: allowedMaslak,
      account: req.account.id
    }).save();

    // initiate email invitation
    sendInvitation(to, name, sender.fullName, sender._id, allowedMaslak, invite._id)

    res.json(invite);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const resendInvite = async (req, res) => {
  try {
    const { _id, to } = req.body;
    if (!_id) throw "Invite ID not provided"
    if (!to) throw "Provide the email address to send the invite"

    let invite = await Invite.findOne({ _id }).exec();

    if (invite.acceptedBy) throw "Invite has already been accepted";

    let updates = { to }
    await invite.update(updates).exec()

    // resend email invitation
    let sender;
    if (req.account.isAdmin) {
      sender = { fullName: 'Alimbook Team', _id: 'admin' }
    } else {
      sender = await Alim.findById(req.account.alim).lean().exec()
    }
    sendInvitation(to, invite.name, sender.fullName, sender._id, invite.maslak, invite._id)

    res.json({
      _id,
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getMyInvites = async (req, res) => {
  try {
    const invites = await Invite.find({ account: req.account.id })
      .populate('acceptedBy', 'avatar fullName maslak')
      .sort('-createdAt')
      .select('-__v')
      .exec()

    res.json(invites);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getAllInvites = async (req, res) => {
  try {
    const invites = await Invite.find({})
      .populate('acceptedBy', 'avatar fullName maslak')
      .select('-__v')
      .exec()

    res.json(invites);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getInvite = async (req, res) => {
  try {
    res.json(req.invite);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const inviteId = async (req, res, next, _id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw "Invalid invite ID"
    }
    req.invite = await Invite.findOne({ _id })
      .populate({
        path: 'account',
        select: 'alim',
        populate: {
          path: 'alim',
          select: 'fullName maslak'
        }
      })
      .populate('acceptedBy', 'fullName maslak')
      .select('-__v')
      .exec();
    next();
  } catch (err) {
    next(err);
  }
};
