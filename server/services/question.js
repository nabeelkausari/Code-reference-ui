import Question from "../models/Question"

export const createQuestion = async (req, res) => {
  try {
    const { text, ...rest } = req.body.question;
    const { isAlim } = req.account;
    if (!text) throw "Write something before submitting"

    const profileId = isAlim
      ? { alim: req.account.alim._id }
      : { user: req.account.user._id }

    let question = await new Question({
      text,
      ...rest,
      account: req.account.id,
      maslak: req.account[isAlim ? 'alim' : 'user'].maslak,
      ...profileId
    }).save();

    res.json(question);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getAnsweredQuestions = async (req, res) => {
  try {
    const query = req.query.param ? { ...req.query.param } : {};
    const questions = await Question.find({...query, answers: { $exists: true, $ne: [] }})
      .sort('-createdAt')
      .limit(20)
      .populate('user', 'fullName avatar maslak')
      .populate('alim', 'fullName avatar maslak')
      .lean()
      .exec();

    res.json(questions);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getAnsweredQuestion = async (req, res) => {
  try {
    res.json(req.answeredQuestion);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getQuestions = async (req, res) => {
  try {
    const query = req.query.param ? { ...req.query.param } : {};
    const questions = await Question.find({...query, answers: { $eq: [] } })
      .sort('-createdAt')
      .limit(20)
      .populate('user', 'fullName avatar maslak')
      .populate('alim', 'fullName avatar maslak')
      .lean()
      .exec();

    res.json(questions);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getQuestion = async (req, res) => {
  try {
    res.json(req.question);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const answeredQuestionId = async (req, res, next, _id) => {
  try {
    req.answeredQuestion = await Question.findOne({ _id, answers: { $exists: true, $ne: [] }})
      .populate('answers')
      .select('-__v')
      .exec();
    next();
  } catch (err) {
    next(err);
  }
};

export const questionId = async (req, res, next, _id) => {
  try {
    req.question = await Question.findOne({ _id })
      .select('-__v')
      .exec();
    next();
  } catch (err) {
    next(err);
  }
};
