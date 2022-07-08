const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  res.status(code).send({ messages: error, fields: field });
};

const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const fields = Object.values(err.errors).map((el) => el.path);
  const code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join("");
    res.status(code).send({ messages: formattedErrors, fields: fields });
  } else {
    res.status(code).send({ messages: errors, fields: fields });
  }
};

const errorController = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;

  console.error(err);

  try {
    if (err.name === "ValidationError") handleValidationError(err, res);
    else if (err.code && err.code == 11000) handleDuplicateKeyError(err, res);
    else res.status(err.statusCode).json(err);
  } catch (err) {
    console.error(err);

    res.status(500).send("An unknown error occurred.");
  }
};

module.exports = errorController;
