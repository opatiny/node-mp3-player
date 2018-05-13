// testing I2C parameters and i2c-bus library
'use strict';

// require libraries
const debug = require('debug')('i2c:test/i2cLibrary'); // debug library
const i2c = require('i2c-bus').openSync(1); // for I2C, open connection on bus 1

// slave I2C address
const ADDRESS = 8;

let luminosity = i2c.readWordSync(ADDRESS, 0);

debug(luminosity);

