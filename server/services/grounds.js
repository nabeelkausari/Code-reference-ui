import Ground from "../models/Ground";
import Wallet from "../models/Wallet";
import Fund from "../models/Fund";
import Participation from "../models/Participation";

export const checkOpponent = (ground, opponentSide, userId) => {
  if (ground[opponentSide].user && ground[opponentSide].user.toString() === userId) {
    throw "User can't be an opponent of itself";
  }
}

export const isGroundOpen = async groundId => {
  let ground = await Ground.findOne({ _id: groundId }).populate('match').exec()
  if (!ground.open) throw 'Ground is closed';
  return ground;
}

export const userCanWithdraw = async groundId => {
  let ground = await Ground.findOne({ _id: groundId }).populate('match').exec()
  if (!ground.canWithdraw) {
    throw "Can't withdraw funds from ground, either you found a pair or match is live";
  }
  return ground;
}

export const userCanExit = async groundId => {
  let ground = await Ground.findOne({ _id: groundId }).populate('match').exec()
  if (!ground.canExit) {
    throw "Can't exit from ground, you have found a pair";
  }
  return ground;
}

export const isUserParticipant = async (ground, userId) => {
  let teamSide;
  if (ground.teamA.user && ground.teamA.user.toString() === userId) {
    teamSide = "teamA";
  } else if (ground.teamB.user && ground.teamB.user.toString() === userId) {
    teamSide = "teamB";
  } else throw 'User is not a participant';
  return teamSide;
}

export const updateTokenFund = async (userId, tokenId, add) => {
  let tokenFund = await Fund.findOne({ userId , tokenId }).exec();
  if (!tokenFund) throw "User has no token records";

  let balance = parseInt(tokenFund.balance);
  let tokenNewBalance = add ? balance + 1 : balance - 1;
  await tokenFund.update({ balance: tokenNewBalance });
  return tokenNewBalance;
}

export const updateEtherFund = async (userId, unit, add) => {
  let wallet = await Wallet.findOne({ userId }).exec();
  if (!wallet) throw "User has no wallet";

  let balance = parseInt(wallet.ethBalance);
  let ethNewBalance = add ? balance + unit : balance - unit;
  await wallet.update({ ethBalance: ethNewBalance });
  return ethNewBalance;
}

export const removeParticipant = async (userId, groundId) => {
  let participation = await Participation.findOne({ userId }).exec()
  let groundIndex = participation.grounds.indexOf(groundId);
  await participation.update({ grounds: [
    ...participation.grounds.slice(0, groundIndex),
    ...participation.grounds.slice(groundIndex + 1)
  ]});
  return true;
}
