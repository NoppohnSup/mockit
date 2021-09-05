const ParserFactory = require('./parser/ParserFactory');

const _ = require('lodash');
const moment = require('moment');

function ParsableJson(json, request = {}) {
  if (Array.isArray(json)) {
    this.json = json.map(o => Object.assign({}, o));
  } else if (typeof json === 'object') {
    this.json = Object.assign({}, json);
  } else {
    this.json = json;
  }

  this.request = request;
  this.moment = new moment();

  this.get = () => {
    return parse(this.json);
  };

  const parseString = (str) => {
    let matches = str.match(/{{(.*?)}}/);
    if (matches) {
      let parsed = parseStringTemplate(matches[1]);
      if (typeof parsed === 'object') {
        return parsed;
      }
      return str.replace(matches[0], parsed);
    }
    return str;
  };

  const parse = (item) => {
    switch (typeof item) {
      case 'string':
        return parseString(item);
      case 'object':
        return parseObject(item);
      default:
        return item;
    }
  };

  const parseObject = (object) => {
    if (Array.isArray(object)) {
      return parseArray(object);
    }

    for (let key in object) {
      if (!object.hasOwnProperty(key)) continue;
      let value = object[key];
      object[key] = parse(value);
    }
    return object;
  };

  const parseArray = (array) => {
    return array.map(item => {
      return parse(item);
    });
  };

  const parseStringTemplate = (str) => {
    try {
      let splits = str.split(' ');

      if (splits) {
        let template = splits[0];
        let parser = ParserFactory.getParser(template, str, this.request.body);
        return parser.parse();
      }
    } catch (e) {
      console.log('parseStringTemplate error: ', e);
    }
    return str;
  };
}

module.exports = ParsableJson;