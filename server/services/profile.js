import Image from "../models/Image"
import Post from "../models/Post"
import Answer from "../models/Answer"
import Question from "../models/Question"
import Alim from "../models/Alim"
import User from "../models/User"

import { decodeBase64Image } from "./image"

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body.profile;
    const { isAlim } = req.account;
    if (!avatar) throw "No avatar provided"
    const profile = isAlim ? req.account.alim : req.account.user;

    if (profile.avatar) {
      await Image.findByIdAndDelete(profile.avatar).exec();
    }

    let imageBuffer = decodeBase64Image(avatar.data);
    let avatarImage = await new Image({ img: imageBuffer }).save();

    isAlim
      ? await Alim.findByIdAndUpdate(profile._id, { avatar: avatarImage._id }).exec()
      : await User.findByIdAndUpdate(profile._id, { avatar: avatarImage._id }).exec()

    res.json({
      avatar: avatarImage._id
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}
export const updateProfile = async (req, res) => {
  try {
    const { fullName, maslak, dob, gender } = req.body.profile;
    const { isAlim } = req.account;
    const profile = isAlim ? req.account.alim : req.account.user;

    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (maslak && !isAlim) updates.maslak = maslak;
    if (dob) updates.dob = dob;
    if (gender) updates.gender = gender;

    isAlim
      ? await Alim.findByIdAndUpdate(profile._id, updates).exec()
      : await User.findByIdAndUpdate(profile._id, updates).exec()

    res.json({ ...updates });
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getProfile = async (req, res) => {
  try {
    res.json(req.account.isAlim ? req.account.alim : req.account.user);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ alim: req.account.alim._id }).exec()
    res.json(posts);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getMyAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({ alim: req.account.alim._id })
      .populate('question').exec();
    res.json(answers);
  } catch (error) {
    res.status(422).send({ error });
  }
}


export const getMyQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ account: req.account.id }).exec();
    res.json(questions);
  } catch (error) {
    res.status(422).send({ error });
  }
}
