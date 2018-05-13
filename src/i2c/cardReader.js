// program that requires I2C slave parameters and pushes them to CardReader.prototype.status

'use strict';

// require libraries
const debug = require('debug')('i2c:cardReader'); // debug library
const delay = require('delay'); // for delays (async)

// slave I2C address
const ADDRESS = 8;

// define CardReader object
function CardReader(bus) { // to create new CardReader instance you need to call an I2C bus
  debug('Initialization of card reader');
  this.bus = bus;
}

// push I2C parameters to CardReader.prototype.status, status is a function common to all CardReader instances
CardReader.prototype.status = async function () {
  debug('get status of card reader');
  // require cardReader parameters through I2C
  let luminosity = this.bus.readWordSync(ADDRESS, 0);
  await delay(1);
  let temperature = this.bus.readWordSync(ADDRESS, 1);
  await delay(1);
  let switchState = this.bus.readWordSync(ADDRESS, 2);
  await delay(1);
  let card = (this.bus.readWordSync(ADDRESS, 5) << 16) + this.bus.readWordSync(ADDRESS, 6);
  await delay(1);
  if (card < 0) card += 2 ** 31;
  card = card.toString(16); // create a string in base 16
  card = card.padStart(8, '0'); // fill with '0' in front if not 8 characters
  card = `${card.substr(0, 4)}-${card.substr(4, 4)}`; // four numbers then - then four other numbers
  debug('status of card reader', luminosity, temperature, switchState, card);
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
