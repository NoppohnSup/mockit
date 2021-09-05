const moment = require('moment');

const DEFAULT_FORMAT = 'YYYYMMDDHHmmss';

function DateTimeParser(text) {
  this.text = text;
  this.moment = moment();

  this.parse = () => {
    let format = getProps('format') || DEFAULT_FORMAT;
    let offset = getProps('offset');

    if (offset) {
      let [amount, unit] = offset.split(' ');
      this.moment.add(amount, unit);
    }

    if (format === 'epoch') {
      return this.moment.unix();
    } else if (format === 'epochmilliseconds') {
      return this.moment.unix() * 1000;
    } else {

      return this.moment.format(format);
    }
  };

  const getProps = (prop) => {
    const regex = new RegExp(`${prop}='(.*?)'`);
    try {
      return this.text.match(regex)[1];
    } catch (e) {
      return '';
    }
  };
}

module.exports = DateTimeParser;