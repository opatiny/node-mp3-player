const I2C = require('i2c-bus');
const i2c = I2C.openSync(1);

const PCA9865 = require('./pca9865.js');
const delay=require('delay');
// scan(i2c);


const pcas=initPCAs(i2c,0,14);
resetPCAs(pcas);

test();

function test () {
    for (let i=0; i<10; i++) {
        allOnPCAs(pcas);
        allOffPCAs(pcas);
    }
}



return;


while (true) {
    readParameters();
}

function readParameters() {
    let luminosity=i2c.readWordSync(8, 0);
    let temperature=i2c.readWordSync(8, 1);
    let switchState=i2c.readWordSync(8, 2);
    let card=(i2c.readWordSync(8, 5)<<16) + i2c.readWordSync(8, 6)
    if (card<0) card+=2**31;

    console.log(luminosity, temperature, switchState, card.toString(16));
}



function initPCAs(bus, from ,to) {
    let pcas=[];
    for (let i=from; i<=to; i++) {
        pcas.push(new PCA9865(bus, i));
    }
    return pcas;
}

function resetPCAs(pcas) {
    for (let pca of pcas) {
        pca.reset();
    }
}

function allOnPCAs(pcas) {
    for (let pca of pcas) {
        pca.allOn();
    }
}

function allOffPCAs(pcas) {
    for (let pca of pcas) {
        pca.allOff();
    }
}




function scan(bus) {
    let devices = bus.scanSync();
    for (let device of devices) {
        console.log(device);
    }
}
