class BadRequestError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 404;
  }
}

class NotAuthenticatedError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 401;
  }
}

class NotAuthorizedError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 401;
  }
}

class SessionExpiredError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 440;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  NotAuthenticatedError,
  SessionExpiredError,
  NotAuthorizedError,
};
