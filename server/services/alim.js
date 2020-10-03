import Alim from "../models/Alim"
import AlimCircle from "../models/AlimCircle"
import UserCircle from "../models/UserCircle"
import Post from "../models/Post"
import Answer from "../models/Answer"
import Setting from "../models/Setting"


export const getUlama = async (req, res) => {
  try {
    const settings = await Setting
      .findOne({ account: req.account.id }).exec();

    const maslak = req.account.isAlim
      ? req.account.alim.maslak
      : req.account.user.maslak;

    const query = settings.content.onlyMyMaslak ? { maslak } : {};
    const ulama = await Alim
      .find({ ...query })
      .exec();

    res.json(ulama);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getMyCircles = async (req, res) => {
  try {
    let circles = req.account.isAlim
      ? await AlimCircle.findOne({ account: req.account.id }).lean().exec()
      : await UserCircle.findOne({ account: req.account.id }).lean().exec()

    res.json(circles);
  } catch (error) {
    res.status(422).send({ error });
  }
}


export const getMyFollowings = async (req, res) => {
  try {
    let circles = req.account.isAlim
      ? await AlimCircle.findOne({ account: req.account.id }).populate('followings').lean().exec()
      : await UserCircle.findOne({ account: req.account.id }).populate('followings').lean().exec()

    res.json(circles.followings);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const followAlim = async (req, res) => {
  try {
    const { alim } = req.body;
    const followerId = req.account.isAlim
      ? req.account.alim._id.toString()
      : req.account.user._id.toString();
    if (!alim) throw "Alim Id is required";

    const circle = req.account.isAlim
      ? await AlimCircle.findOne({ account: req.account.id }).exec()
      : await UserCircle.findOne({ account: req.account.id }).exec()

    const alimCircle = await AlimCircle.findOne({ alim }).exec();
    if (!alimCircle) throw "No Alim found with this ID";

    const isFollowing = circle.followings.indexOf(alim) > -1;
    const isAlimsFollower = req.account.isAlim
      ? alimCircle.alimFollowers.indexOf(followerId) > -1
      : alimCircle.followers.indexOf(followerId) > -1

    if (isFollowing || isAlimsFollower) {
      throw "You are already following this alim"
    }

    const circleUpdate = [
      ...circle.followings,
      alim
    ];

    const alimCircleUpdate = req.account.isAlim
      ? {
        alimFollowers: [
          ...alimCircle.alimFollowers,
          followerId
        ]
      }
      : {
        followers: [
          ...alimCircle.followers,
          followerId
        ]
      };

    await circle.update({ followings: circleUpdate }).exec();

    await alimCircle.update(alimCircleUpdate).exec()

    res.json(circleUpdate);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const unFollowAlim = async (req, res) => {
  try {
    const { alim } = req.body;
    const followerId = req.account.isAlim
      ? req.account.alim._id.toString()
      : req.account.user._id.toString();
    if (!alim) throw "Alim Id is required";

    const circle = req.account.isAlim
      ? await AlimCircle.findOne({ account: req.account.id }).exec()
      : await UserCircle.findOne({ account: req.account.id }).exec()

    const alimCircle = await AlimCircle.findOne({ alim }).exec();
    if (!alimCircle) throw "No Alim found with this ID";

    const isFollowing = circle.followings.indexOf(alim) > -1;
    const isAlimsFollower = req.account.isAlim
      ? alimCircle.alimFollowers.indexOf(followerId) > -1
      : alimCircle.followers.indexOf(followerId) > -1

    if (!isFollowing || !isAlimsFollower) {
      throw "You are not following this alim"
    }

    const circleUpdate = [
      ...circle.followings.slice(0, circle.followings.indexOf(alim)),
      ...circle.followings.slice(circle.followings.indexOf(alim) + 1),
    ];

    const alimCircleUpdate = req.account.isAlim
      ? {
        alimFollowers: [
          ...alimCircle.alimFollowers.slice(0, alimCircle.alimFollowers.indexOf(followerId)),
          ...alimCircle.alimFollowers.slice(alimCircle.alimFollowers.indexOf(followerId) + 1),
        ]
      }
      : {
        followers: [
          ...alimCircle.followers.slice(0, alimCircle.followers.indexOf(followerId)),
          ...alimCircle.followers.slice(alimCircle.followers.indexOf(followerId) + 1),
        ]
      };

    await circle.update({ followings: circleUpdate }).exec();
    await alimCircle.update(alimCircleUpdate).exec()

    res.json(circleUpdate);
  } catch (error) {
    res.status(422).send({ error });
  }
}

// export const updateAlimProfile = async (req, res) => {
//   try {
//     const alim = await Alim.findOne({ _id: req.user.alimId }).exec();
//     if (!alim) throw "User has no alim profile";
//
//     await alim.update({ ...req.body.profileUpdate }).exec();
//
//     res.json({
//       ...alim._doc,
//       ...req.body.profileUpdate
//     });
//   } catch (error) {
//     res.status(422).send({ error });
//   }
// }

export const getAlimProfile = async (req, res) => {
  try {
    res.json(req.alim)
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getAlimPosts = async (req, res) => {
  try {
    const posts = await Post.find({ alim: req.alim._id })
      .sort('-createdAt')
      .limit(20)
      .lean()
      .exec();

    res.json(posts)
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getAlimAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({ alim: req.alim._id })
      .sort('-createdAt')
      .limit(20)
      .lean()
      .exec();

    res.json(answers)
  } catch (error) {
    res.status(422).send({ error });
  }
}


export const alimId = async (req, res, next, _id) => {
  try {
    req.alim = await Alim.findOne({ _id }).exec();
    next();
  } catch (err) {
    next(err);
  }
};
