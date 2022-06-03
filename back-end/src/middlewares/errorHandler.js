const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;