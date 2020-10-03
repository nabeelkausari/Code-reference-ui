import Post from "../models/Post"
import {decodeBase64Image} from "./image"
import Image from "../models/Image"
import UserCircle from "../models/UserCircle"
import Vote from "../models/Vote"
import {find, some} from "lodash"
import AlimCircle from "../models/AlimCircle"
import urlMeta from 'url-metadata';


export const createPost = async (req, res) => {
  try {
    const { image, ...newPost } = req.body.newPost;
    let post = await new Post({
      ...newPost,
      alim: req.account.alim._id,
      maslak: req.account.alim.maslak,
      account: req.account.id
    }).save();

    let response = {
      ...post._doc,
      alim: {
        fullName: req.account.alim.fullName,
        maslak: req.account.alim.maslak
      }
    }

    if (image) {
      let imageBuffer = decodeBase64Image(image.data);
      let postImage = await new Image({ img: imageBuffer }).save();
      await post.update({ image: postImage }).exec();
      response.image = postImage._id;
    }

    res.json(response);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const extractMeta = async (req, res) => {
  try {
    const meta = await urlMeta(req.body.url)
    res.json(meta);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getPosts = async (req, res) => {
  try {
    const circle = req.account.isAlim
      ? await AlimCircle.findOne({account: req.account.id}).exec()
      : await UserCircle.findOne({account: req.account.id}).exec()

    // preparing the array of ulama whom auth account is following
    const postCreators = [
      ...circle.followings
    ]

    // if auth account is alim then pushing his alimId to ulama array
    if (req.account.isAlim) {
      postCreators.push(req.account.alim._id)
    }

    let posts = await Post.find({ alim: { $in: postCreators }})
      .sort('-createdAt')
      .limit(20)
      .populate('alim', 'avatar fullName maslak')
      .lean()
      .exec();

    const votes = await Vote.find({
      account: req.account.id, // select only auth account votes
      post: {$ne: null}, // only votes on post
      comment: {$eq: null} // don't select votes on comment
    }).lean().exec();

    // preparing the array of posts voted by auth account
    const votedPosts = votes.map(v => v.post.toString());

    // add a 'hasVoted' flag if auth user has voted the post
    posts = posts.map(post => ({
      ...post,
      hasVoted: votedPosts.indexOf(post._id.toString()) > -1
    }))

    res.json(posts);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const addVoteToPost = async (req, res, next, io) => {
  try {
    const post = await Post
      .findOne({ _id: req.body.postId })
      .populate('votes')
      .populate('alim')
      .exec();

    if (some( post.votes, vote => vote.account.toString() === req.account.id.toString() )) {
      throw "You already had voted this post"
    }

    const vote = await new Vote({ account: req.account.id, post: req.body.postId }).save();
    const updatedVotes = [
      ...post.votes.map(v => v._id),
      vote._id
    ];
    await post.update({ votes: updatedVotes });

    const updates = {
      postId: req.body.postId,
      votes: updatedVotes
    }

    io.emit('postVoteAdded', updates)
    res.json({
      ...updates,
      hasVoted: true
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}

export const removeVoteFromPost = async (req, res, next, io) => {
  try {
    const post = await Post
      .findOne({ _id: req.body.postId })
      .populate('votes')
      .exec();

    const vote = find(post.votes, vote => vote.account.toString() === req.account.id.toString());

    if (!vote) throw "You had not voted this post yet"

    await Vote.remove({ _id: vote._id }).exec();

    const votes = post.votes.map(v => v._id);
    const updatedVotes = [
      ...votes.slice(0, votes.indexOf(vote._id)),
      ...votes.slice(votes.indexOf(vote._id) + 1, votes.length)
    ];

    await post.update({ votes: updatedVotes });

    const updates = {
      postId: req.body.postId,
      votes: updatedVotes
    }

    io.emit('postVoteRemoved', updates)
    res.json({
      ...updates,
      hasVoted: false
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}

