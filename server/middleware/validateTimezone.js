const validateTimezone = (req, res, next) => {
  const { timezone } = req.params;

  try {
    // Verify timezone is valid
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    req.validTimezone = timezone;
    next();
  } catch (error) {
    const err = new Error(`Invalid timezone: ${timezone}`);
    err.status = 400;
    next(err);
  }
};

module.exports = validateTimezone;
