// function that scans I2C bus with I2C-bus library

'use strict';

// require libraries
const debug = require('debug')('i2c:test/scanBus'); // debug library
const i2c = require('i2c-bus').openSync(1);

scan(i2c);


function scan(bus) {
  let devices = bus.scanSync();
  debug('List of devices found:');
  for (let device of devices) {
    debug(device);
  }
}
