const fs = require('fs-extra');
const path = require('path');

const getConfig = async () => {
  return await fs.readJson(getConfigPath());
};

const writeConfig = async config => {
  fs.writeJson(getConfigPath(), config, {spaces: 2});
};

const getConfigPath = () => {
  let p = path.resolve(__dirname, '../../configuration/routes.json');

  if (!fs.pathExistsSync(p)) {
    p = path.resolve(__dirname, '../../../configuration/routes.json');
  }

  return p;
};

module.exports = {
  getConfig,
  writeConfig
};
