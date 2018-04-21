// program that requires I2C slave parameters and pushes them to CardReader.prototype.status

'use strict';

// require libraries
const debug = require('debug')('i2c:cardReader'); // debug library

// slave I2C address
const ADDRESS = 8;

// define I2C bus
function CardReader(bus) {
  debug(this);
  this.bus = bus;
}

// push I2C parameters to CardReader.prototype.status
CardReader.prototype.status = function () {
  // require cardReader parameters through I2C
  let luminosity = this.bus.readWordSync(ADDRESS, 0);
  let temperature = this.bus.readWordSync(ADDRESS, 1);
  let switchState = this.bus.readWordSync(ADDRESS, 2);
  let card = (this.bus.readWordSync(ADDRESS, 5) << 16) + this.bus.readWordSync(ADDRESS, 6);
  if (card < 0) card += 2 ** 31;
  card = card.toString(16); // create a string in base 16
  card = card.padStart(8, '0'); // fill with '0' in front if not 8 characters
  card = `${card.substr(0, 4)}-${card.substr(4, 4)}`;
  return {
    luminosity,
    temperature,
    switchState,
    card
  };
};

module.exports = CardReader;

/*
syntax allowing multi-line string with variable insertion
let a = `ma carte est ${card} asdfasdf
asdf
asdf
asdf
`;
*/
