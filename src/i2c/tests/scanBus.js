const i2c = require('i2c-bus').openSync(1);

scan(i2c);

function scan(bus) {
    let devices = bus.scanSync();
    console.log('List of devices found:');
    for (let device of devices) {
        console.log(device);
    }
}
