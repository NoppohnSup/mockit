const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

const ParsableJson = require('./ParsableJson');
const {getConfig} = require('./util/ConfigUtil');
const delayMiddleware = require("./middlewares/delay");
const chaosMonkeyMiddleware = require("./middlewares/chaos-monkey");
const basicAuth = require("./middlewares/basic-auth");

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const data = getConfig();
const { routes, settings: { features: { cors: corsFeature } = {} } = {} } = data;

app.use(basicAuth);
app.use(delayMiddleware);
app.use(chaosMonkeyMiddleware);

if (corsFeature) {
  app.use(cors());
}

routes.forEach(route => {
  const { route: path, statusCode, payload, disabled = false, httpMethod = "GET" } = route;

  const method = httpMethod.toLowerCase();

  if (!disabled) {
    app[method](path, jsonParser, (req, res) => {
      const parsableJson = new ParsableJson(payload, req);
      const json = parsableJson.get();
      res.status(statusCode).send(json);
    });
  }
});

if (process.env.ENV !== "test") {
  server = app.listen(port, () => console.log(`MockIt app listening on port ${port}!`));
}

module.exports = app;
