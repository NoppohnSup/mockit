const {getConfig} = require('../../util/ConfigUtil');
const data = getConfig();
const { routes } = data;

const findRoute = path => {
  return routes.find(({ route } = {}) => {
    return route === path;
  });
};

module.exports = (req, res, next) => {
  const { delay = 0 } = findRoute(req.url) || {};

  if (delay > 0) {
    return setTimeout(next, delay);
  }

  next();
};
