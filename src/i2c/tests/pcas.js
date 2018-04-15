const I2C = require('i2c-bus');
const i2c = I2C.openSync(1);

const PCA9865 = require('../pca9865.js');
const delay=require('delay');
// scan(i2c);


const pcas=createPCAs(i2c,0,14);

test();

function test () {
    for (let i=0; i<100; i++) {
        for (let intensity=0; intensity<4095; intensity+=500) {
            allDimmedPCAs(pcas, intensity);
        }
        for (let intensity=4000; intensity>=0; intensity-=500) {
            allDimmedPCAs(pcas, intensity);
        }
    }
}



function createPCAs(bus, from ,to) {
    let pcas=[];
    for (let i=from; i<=to; i++) {
        pcas.push(new PCA9865(bus, i));
    }
    return pcas;
}

function allOnPCAs(pcas) {
    for (let pca of pcas) {
        pca.on();
    }
}

function allDimmedPCAs(pcas, intensity) {
    for (let pca of pcas) {
        pca.dimmed(intensity);
    }
}

function allOffPCAs(pcas) {
    for (let pca of pcas) {
        pca.off();
    }
}
