const fs = require('fs-extra');
const path = require('path');

const getConfig = () => {
  let p = path.resolve(__dirname, '../../configuration/routes.json');
  if (!fs.pathExistsSync(p)) {
    p = path.resolve(__dirname, '../../../configuration/routes.json');
  }

  return fs.readJsonSync(p);
};

module.exports = {getConfig};