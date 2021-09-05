const { hitByMonkey } = require("./util");
const {getConfig} = require('../../util/ConfigUtil');
const data = getConfig();
const { settings } = data;
const { features: { chaosMonkey } = {} } = settings;

module.exports = (req, res, next) => {
  if (!chaosMonkey) {
    return next();
  }

  // send random message back
  if (hitByMonkey()) {
    return res.send("Monkey left you a 🍌...");
  }

  // send back server error
  if (hitByMonkey()) {
    return res.send(500);
  }

  // timeout the request, send nothing back
  if (hitByMonkey()) {
    return null;
  }

  // well done you passed. Continue
  next();
};
