const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: err.message,
        status: 400,
      },
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid token',
        status: 401,
      },
    });
  }

  res.status(500).json({
    success: false,
    error: {
      message: 'Server Error',
      status: 500,
    },
  });
};

module.exports = errorHandler;
