import Counter from "../models/Counter";

export default async () => {
  let auctionQuery = {id: 'auctionId'};
  let userQuery = {id: 'userId'}

  let auctionCounter = await Counter.find(auctionQuery).exec();
  if (auctionCounter.length === 0) {
    await new Counter({ ...auctionQuery, seq: 200 }).save();
  }

  let userCounter = await Counter.find(userQuery).exec();
  if (userCounter.length === 0) {
    await new Counter({... userQuery, seq: 300}).save();
  }
}
