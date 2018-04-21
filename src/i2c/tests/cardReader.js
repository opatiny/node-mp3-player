// testing I2C parameters and i2c-bus library

'use strict';

// require libraries
const debug = require('debug')('i2c:test/cardReader'); // debug library
const delay = require('delay'); // for delays
const i2c = require('i2c-bus').openSync(1); // for I2C, plus open connection on bus 1

// require functions
const CardReader = require('../cardReader.js');

// new instance of cardReader
const cardReader = new CardReader(i2c);

// running function that returns cardReader I2C slave parameters
read();

async function read() {
  while (true) {
    let status = cardReader.status();
    debug(status);
    await delay(500);
  }
}
