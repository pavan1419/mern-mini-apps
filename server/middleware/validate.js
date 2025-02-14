const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: {
        message: error.details[0].message,
        status: 400,
      },
    });
  }
};

module.exports = validate;
