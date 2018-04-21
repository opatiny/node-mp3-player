// test ledDisplay: blink all segments

'use strict';

// require libraries
const i2c = require('i2c-bus').openSync(1);
const delay = require('delay');

// require Display and create new instance
const Display = require('../display.js');
const display = new Display(i2c);

test();

async function test() {
    for (let i=0; i<10; i++) {
        for (let line = 0; line<3; line++) {
            display.setIntensity(Math.floor(Math.random()*500)); // Math.floor rounds to integer under
            display.on(line);
            await delay(100);
            display.off(line);
            await delay(100);
        }
    }
}

display.setText('ABCDEFGHIJKL');
await delay(100);
