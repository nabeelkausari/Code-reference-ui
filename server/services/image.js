import Image from "../models/Image"

export const decodeBase64Image = dataString => {
  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.contentType = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

export const getImage = async (req, res) => {
  try {
    res.contentType(req.image.img.contentType);
    res.send(req.image.img.data);
  } catch (err) {
    res.send(err)
  }
}

export const imageId = async (req, res, next, _id) => {
  try {
    req.image = await Image.findOne({ _id }).exec();
    next();
  } catch (err) {
    next(err);
  }
};
