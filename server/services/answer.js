import Answer from "../models/Answer"
import Question from "../models/Question"

export const createAnswer = async (req, res) => {
  try {
    const { maslak } = req.account.alim;
    const question = await Question.findOne({ _id: req.body.answer.question }).exec();

    if (question.sameMaslakAnswers && maslak !== question.maslak) {
      throw `Only ${question.maslak} scholars can answer this question`
    }

    const answer = await new Answer({
      ...req.body.answer,
      account: req.account.id,
      alim: req.account.alim._id
    }).save();

    await question.update({
      answers: [
        ...question.answers,
        answer._id
      ]
    }).exec();

    res.json(answer);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.question._id })
      .sort('-createdAt')
      .limit(20)
      .populate('votes')
      .populate('alim')
      .lean()
      .exec();

    res.json({
      ...req.question._doc,
      answers
    });
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getAnswer = async (req, res) => {
  try {
    res.json(req.answer);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const answerId = async (req, res, next, _id) => {
  try {
    req.answer = await Answer.findOne({ _id })
      .populate('votes')
      .select('-__v')
      .exec();
    next();
  } catch (err) {
    next(err);
  }
};
