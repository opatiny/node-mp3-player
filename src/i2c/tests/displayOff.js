// test ledDisplay: turn everything off
'use strict';

// require libraries
const i2c = require('i2c-bus').openSync(1);
const delay = require('delay');

// require Display and create new instance
const Display = require('../display.js');

const display = new Display(i2c);

clear();

async function clear() {
  for (let line = 0; line < 3; line++) {
    display.off(line);
    await delay(100);
  }
}

