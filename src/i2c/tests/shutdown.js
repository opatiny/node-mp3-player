const delay=require('delay');
const i2c = require('i2c-bus').openSync(1);

const CardReader = require('../cardReader.js');

const cardReader = new CardReader(i2c);

const Shutdown = require('shutdown');



read();


async function read() {
    let lastZero=Date.now();
    while (true) {
        let status=cardReader.status();;
        console.log(status);
        await delay(500);
	if (status.switchState===0) {
		if ((Date.now()-lastZero) > 10000) {
			Shutdown.shutdownGracefully();
		}
	} else {
		lastZero=Date.now();

	}
    }
}


