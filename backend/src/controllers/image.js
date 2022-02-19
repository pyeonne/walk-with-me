const asyncHandler = require('../utils/async-handler');

exports.image = asyncHandler(async (req, res) => {
  const { filename } = req.file;
  const url = `https://elice-kdt-sw-1st-team6.elicecoding.com/images/${filename}`
  res.status(200).json(url);
});