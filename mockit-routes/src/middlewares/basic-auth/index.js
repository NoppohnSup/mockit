const auth = require("basic-auth");
const {getConfig} = require('../../util/ConfigUtil');

const data = getConfig();
const { settings } = data;
const { features: { authentication } = {}, authentication: authenticationSettings = {} } = settings;

const isAuthenticated = (name, pass) => {
  const { username, password } = authenticationSettings;

  return name === username && pass === password;
};

module.exports = (req, res, next) => {
  if (!authentication) {
    return next();
  }

  const { name, pass } = auth(req) || {};

  if ((!name && !pass) || !isAuthenticated(name, pass)) {
    return res.status(401).send("Access denied");
  }

  next();
};
