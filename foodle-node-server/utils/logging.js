const logAndRespond = (response, message, code) => {
  console.log({ message, code });
  if (message) {
    if (code) {
      if (code >= 400) {
        response.status(code).json({ error: message });
      } else {
        response.status(code).json({ message });
      }
    } else {
      response.status(200).json({ message });
    }
  } else {
    response.status(200).json({ error: message });
  }
};

module.exports = { logAndRespond };
