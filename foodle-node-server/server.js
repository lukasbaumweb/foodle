#!/usr/bin/env node
const app = require("./app");

const port = process.env.PORT || 3100;
app.set("port", port);

app.listen(port, () =>
  console.info(
    "Listening on http://localhost:" +
      port +
      " in mode: " +
      process.env.NODE_ENV
  )
);

app.on("error", (error) => {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
});
