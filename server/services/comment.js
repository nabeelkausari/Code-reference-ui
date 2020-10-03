import Comment from "../models/Comment"
import {findIndex} from "lodash"
import Post from "../models/Post"
import Vote from "../models/Vote"

export const addPostComment = async (req, res, next, io) => {
  try {
    const post = await getPostDetails(req.post._id, req.account.id)

    if (!req.body.comment.text) {
      throw "Write something before submitting the comment"
    }

    const { maslak } = req.account.isAlim ? req.account.alim : req.account.user;

    if (post.commentsDisabled) {
      throw "Comments disabled on this post";
    }
    if (post.sameMaslakComments && maslak !== post.maslak) {
      throw `Comments allowed only from ${maslak} users`;
    }

    const profileId = req.account.isAlim
      ? { alim: req.account.alim._id }
      : { user: req.account.user._id }

    const comment = await new Comment({
      ...req.body.comment,
      post: req.post._id,
      account: req.account.id,
      ...profileId
    }).save();

    const profile = req.account.isAlim
      ? { alim: { ...req.account.alim._doc } }
      : { user: { ...req.account.user._doc } }

    let commentsUpdated = [
      {
        ...comment._doc,
        ...profile
      },
      ...post.comments
    ]

    await req.post.update({ comments: commentsUpdated }).exec()

    let response = {
      ...post,
      comments: commentsUpdated
    }

    io.emit('postCommentAdded', response)
    res.json(response);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const removePostComment = async (req, res, next, io) => {
  try {
    const post = await getPostDetails(req.post._id, req.account.id)
    let commentIndex = findIndex(post.comments, comment => {
      return comment._id.toString() === req.comment._id.toString()
    })

    let commentsUpdated = [
      ...post.comments.slice(0, commentIndex),
      ...post.comments.slice(commentIndex + 1, post.comments.length)
    ];

    await req.post.update({ comments: commentsUpdated }).exec()
    await req.comment.remove().exec();

    let response = {
      ...post,
      comments: commentsUpdated
    }

    io.emit('postCommentRemoved', response)
    res.json(response);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getPostComments = async (req, res) => {
  try {
    const post = await getPostDetails(req.post._id, req.account.id)
    res.json(post);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getPostDetails = async (_id, account) => {
  try {
    const post = await Post.findOne({ _id })
      .populate('votes')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'user alim'
        }
      })
      .select('-__v')
      .lean()
      .exec();

    const commentVotes = await Vote.find({
      account,
      post: post._id,
      comment: {$ne: null} // select only votes on comment
    }).lean().exec();

    const votedPosts = commentVotes.map(v => v.comment.toString());

    const comments = post.comments.map(comment => ({
      ...comment,
      hasVoted: votedPosts.indexOf(comment._id.toString()) > -1
    }))

    return {
      ...post,
      comments
    }
  } catch (err) {
    throw err;
  }
};

export const commentId = async (req, res, next, _id) => {
  try {
    req.comment = await Comment.findOne({ _id })
      .populate('votes')
      .select('-__v')
      .exec();
    next();
  } catch (err) {
    next(err);
  }
};



export const postId = async (req, res, next, _id) => {
  try {
    req.post = await Post.findOne({ _id }).exec();
    next();
  } catch (err) {
    next(err);
  }
};
