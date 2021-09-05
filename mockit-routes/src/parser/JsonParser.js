const _ = require('lodash');

function JsonParser(text, body) {
  this.text = text;
  this.body = body;

  this.parse = () => {
    let splits = this.text.split(' ');
    try {
      let jsonPath = splits[2].match(/'\$\.(.*?)'/)[1];  // FROM '$.ANY_STRING' -> ANY_STRING
      return _.get(this.body, jsonPath, '');
    } catch (e) {
      return this.text;
    }
  };
}

module.exports = JsonParser;