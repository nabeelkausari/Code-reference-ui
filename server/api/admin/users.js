import User from "../../models/User"

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('email bonusClaimed bonusApproved confirmed createdAt')
      .sort('-createdAt')
      .exec();
    res.json(users);
  } catch (error) {
    res.status(422).send({ error });
  }
}
