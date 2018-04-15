const i2c = require('i2c-bus').openSync(1);
const delay = require('delay');

const Display = require('../display.js');
const display = new Display(i2c);

test();

async function test() {
    for (let i=0; i<10; i++) {
        display.setIntensity(Math.floor(Math.random()*500));
        display.setText('ABCDEFGHIJKLMNOPQRSTUVWXYZ', {
            line: 0,
            overflow: 2
        });
        await delay(100);
    }
}
