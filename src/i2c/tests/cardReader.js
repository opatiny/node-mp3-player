const delay=require('delay');
const i2c = require('i2c-bus').openSync(1);

const CardReader = require('../cardReader.js');

const cardReader = new CardReader(i2c);


read();


async function read() {
    while (true) {
        let status=cardReader.status();;
        console.log(status);
        await delay(500);
    }
}


