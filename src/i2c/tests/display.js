const i2c = require('i2c-bus').openSync(1);
const delay = require('delay');

const Display = require('../display.js');
const display = new Display(i2c);

test();

async function test() {
    for (let i=0; i<10; i++) {
        for (let line = 0; line<3; line++) {
            display.setIntensity(Math.floor(Math.random()*500));
            display.on(line);
            await delay(100);
            display.off(line);
            await delay(100);
        }
    }
}




display.setText('ABCDEFGHIJKL');
await delay(100);