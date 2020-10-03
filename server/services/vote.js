import {find, some} from "lodash"
import Vote from "../models/Vote"

export const addVoteToComment = async (req, res, next, io) => {
  try {
    if (some( req.comment.votes, vote => vote.account.toString() === req.account.id.toString() )) {
      throw "You already had voted this comment"
    }

    const vote = await new Vote({
      account: req.account.id,
      comment: req.comment._id,
      post: req.comment.post
    }).save();

    const updatedVotes = [
      ...req.comment.votes.map(v => v._id),
      vote._id
    ];
    await req.comment.update({ votes: updatedVotes });

    const updates = {
      commentId: req.comment._id,
      postId: req.comment.post,
      votes: updatedVotes
    }

    io.emit('commentVoteAdded', updates)
    res.json({
      ...updates,
      hasVoted: true
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}

export const removeVoteFromComment = async (req, res, next, io) => {
  try {

    const vote = find(req.comment.votes, vote => vote.account.toString() === req.account.id.toString());

    if (!vote) throw "You had not voted this comment yet"

    await Vote.remove({ _id: vote._id }).exec();

    const votes = req.comment.votes.map(v => v._id);

    const updatedVotes = [
      ...votes.slice(0, votes.indexOf(vote._id)),
      ...votes.slice(votes.indexOf(vote._id) + 1, votes.length)
    ];

    await req.comment.update({ votes: updatedVotes });

    const updates = {
      commentId: req.comment._id,
      postId: req.comment.post,
      votes: updatedVotes
    }

    io.emit('commentVoteRemoved', updates)
    res.json({
      ...updates,
      hasVoted: false
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}

export const addVoteToAnswer = async (req, res, next, io) => {
  try {
    if (some( req.answer.votes, vote => vote.account.toString() === req.account.id.toString() )) {
      throw "You already had voted this answer"
    }

    const vote = await new Vote({
      account: req.account.id,
      answer: req.answer._id
    }).save();

    const updatedVotes = [
      ...req.answer.votes.map(v => v._id),
      vote._id
    ];
    await req.answer.update({ votes: updatedVotes });

    const updates = {
      answerId: req.answer._id,
      questionId: req.answer.question,
      votes: updatedVotes
    }

    io.emit('answerVoteAdded', updates)
    res.json({
      ...updates,
      hasVoted: true
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}

export const removeVoteFromAnswer = async (req, res, next, io) => {
  try {

    const vote = find(req.answer.votes, vote => vote.account.toString() === req.account.id.toString());

    if (!vote) throw "You had not voted this answer yet"

    await Vote.remove({ _id: vote._id }).exec();

    const votes = req.answer.votes.map(v => v._id);

    const updatedVotes = [
      ...votes.slice(0, votes.indexOf(vote._id)),
      ...votes.slice(votes.indexOf(vote._id) + 1, votes.length)
    ];

    await req.answer.update({ votes: updatedVotes });

    const updates = {
      answerId: req.answer._id,
      questionId: req.answer.question,
      votes: updatedVotes
    }

    io.emit('answerVoteRemoved', updates)
    res.json({
      ...updates,
      hasVoted: false
    });

  } catch (error) {
    res.status(422).send({ error });
  }
}
