import Ijaza from "../models/Ijaza"

export const getIjazaRequests = async (req, res) => {
  try {
    const data = await Ijaza
      .find({
        requested: true,
        maslak: req.account.alim.maslak,
        granted: { status: 'WAITING' }
      }).exec();

    res.json(data);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getRecentIjazaRequests = async (req, res) => {
  try {
    const { status } = req.query;
    // approved, rejected, in_review, on_hold, cancelled
    const data = await Ijaza
      .find({
        requested: false,
        maslak: req.account.alim.maslak,
        granted: { status }
      }).exec();

    res.json(data);
  } catch (error) {
    res.status(422).send({ error });
  }
}


export const getMyIjazaRequests = async (req, res) => {
  try {
    const data = await Ijaza
      .find({ account: req.account }).exec();
    res.json(data);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const requestIjaza = async (req, res) => {
  try {

    const { type } = req.body
    if (!type) throw 'Ijaza type is required'

    const ijaza = await new Ijaza({
      account: req.account,
      maslak: req.account.alim.maslak,
      alim: req.account.alim,
      type
    }).save();

    // broadcast new ijaza
    // email maslak ulama about ijaza request

    res.json(ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const reviewIjaza = async (req, res) => {
  try {
    await req.ijaza.update({
      review: {
        by: req.account.alim,
        on: new Date()
      },
    }).exec();

    // broadcast ijaza being reviewed
    // email requesting alim about ijaza review

    res.json(req.ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const transferIjazaReview = async (req, res) => {
  try {
    const { alim } = req.body;
    if (!alim) throw "Please select the Alim account you want to transfer the review";

    await req.ijaza.update({
      review: {
        by: alim,
        on: new Date()
      },
    }).exec();

    // broadcast ijaza being reviewed
    // email requesting alim about ijaza review transfer
    // email transferred alim about ijaza review transfer

    res.json(req.ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const approveIjaza = async (req, res) => {
  try {
    await req.ijaza.update({
      requested: false,
      granted: {
        status: 'APPROVED',
        by: req.account.alim,
        on: new Date()
      },
    }).exec();

    // broadcast ijaza been approved
    // email requesting alim about ijaza been approved

    res.json(req.ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const rejectIjaza = async (req, res) => {
  try {
    const { note } = req.body;
    if (!note) throw "Please provide a reason note for rejection";

    await req.ijaza.update({
      requested: false,
      granted: {
        status: 'REJECTED',
        by: req.account.alim,
        on: new Date(),
        note
      },
    }).exec();

    // broadcast ijaza been rejected
    // email requesting alim about ijaza been rejected

    res.json(req.ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const holdIjaza = async (req, res) => {
  try {
    const { note } = req.body;
    if (!note) throw "Please provide a reason note for holding ijaza";

    await req.ijaza.update({
      granted: {
        status: 'ON_HOLD',
        by: req.account.alim,
        on: new Date(),
        note
      },
    }).exec();

    // broadcast ijaza been rejected
    // email requesting alim about ijaza been rejected

    res.json(req.ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const cancelIjaza = async (req, res) => {
  try {
    if (req.account.id !== req.ijaza.account._id) {
      throw "Not allowed to cancel"
    }
    await req.ijaza.update({
      granted: {
        status: 'CANCELLED',
        on: new Date()
      },
    }).exec();

    // broadcast ijaza been cancelled

    res.json(req.ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getIjaza = async (req, res) => {
  try {
    res.json(req.ijaza);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const ijazaId = async (req, res, next, _id) => {
  try {
    req.ijaza = await Ijaza.findOne({ _id }).exec();
    next();
  } catch (err) {
    next(err);
  }
};
