const DateTimeParser = require('./DateTimeParser');
const JsonParser = require('./JsonParser');

const PARSER_MAPPING = {
  'now': DateTimeParser,
  'jsonPath': JsonParser
};

function ParserFactory() {}

ParserFactory.getParser = (template, originalText, body) => {
  return new PARSER_MAPPING[template](originalText, body);
};

module.exports = ParserFactory;