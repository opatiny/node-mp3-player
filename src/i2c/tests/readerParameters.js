const I2C = require('i2c-bus');
const i2c = I2C.openSync(1);
const delay = require('delay');

read();


async function read() {
    while (true) {
        readParameters();

    console.log(luminosity, temperature, switchState, card.toString(16));
        delay(500);
    }
}


function readParameters() {
    let luminosity=i2c.readWordSync(8, 0);
    let temperature=i2c.readWordSync(8, 1);
    let switchState=i2c.readWordSync(8, 2);
    let card=(i2c.readWordSync(8, 5)<<16) + i2c.readWordSync(8, 6)
    if (card<0) card+=2**31;
    return {
        luminosity, temperature, switchState, card);
    }
}

