// test chip shutdown

'use strict';


// require libraries
const exec = require('child_process').exec; // library that allows to execute bash

const debug = require('debug')('i2c:test/shutdown'); // debug library
const i2c = require('i2c-bus').openSync(1);
const delay = require('delay');

read();

async function read() {
  let lastZero = Date.now(); // time from last boot
  while (true) {
    await delay(500);
      if ((Date.now() - lastZero) > 5000) { // force button to be pressed for 5 seconds
        exec('shutdown -h now'); // executes bash command
      }
   }
}

