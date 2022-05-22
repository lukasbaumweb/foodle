const CODES = {
  "auth-error": {
    "auth-error/incorrect-password": "incorrect password",
    "auth-error/user-unknown": "user unknown",
  },
};
const translater = (code) => {
  switch (code.split("/")[0]) {
    case "auth-error":
      return CODES["auth-error"][code];

    default:
      throw new Error(code + " is an unhandled error code");
  }
};

module.exports = {
  translater,
  codes: CODES,
};
