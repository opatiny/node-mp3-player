const delay=require('delay');
const i2c = require('i2c-bus').openSync(1);

const CardReader = require('../cardReader.js');

const cardReader = new CardReader(i2c);

const exec = require('child_process').exec;



read();


async function read() {
    let lastZero=Date.now();
    while (true) {
        let status=cardReader.status();;
        console.log(status);
        await delay(500);
	if (status.switchState===0) {
		if ((Date.now()-lastZero) > 5000) {
			exec('shutdown -h now');
		}
	} else {
		lastZero=Date.now();

	}
    }
}


