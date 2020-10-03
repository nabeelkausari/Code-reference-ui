import Setting from "../models/Setting"

export const createSettings = async (req, res) => {
  try {
    const settings = await new Setting({ account: req.account.id }).save();
    res.json(settings);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const updateSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne({ account: req.account.id }).exec();
    await settings.update(req.body.settings).exec()
    res.json(req.body.settings);
  } catch (error) {
    res.status(422).send({ error });
  }
}

export const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne({ account: req.account.id }).exec();
    res.json(settings);
  } catch (error) {
    res.status(422).send({ error });
  }
}
