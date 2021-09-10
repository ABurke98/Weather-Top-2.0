const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    //logger function for sending messages to the console.
    label({ label: "Playlist" }),
    //      timestamp(),
    prettyPrint()
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
