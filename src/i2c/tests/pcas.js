const i2c = require('i2c-bus').openSync(1);

const PCA9685 = require('../pca9685.js');
const delay=require('delay');

const pcas=createPCAs(i2c,0,14);

test();

function test() {
    for (let i=0; i<5; i++) {
        for (let intensity=0; intensity<200; intensity+=10) {
            allDimmedPCAs(pcas, intensity);
        }
        for (let intensity=200; intensity>=0; intensity-=10) {
            allDimmedPCAs(pcas, intensity);
        }
    }
}

function createPCAs(bus, from ,to) {
    let pcas=[];
    for (let i=from; i<=to; i++) {
        pcas.push(new PCA9685(bus, i));
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
        pca.dim(intensity);
    }
}

function allOffPCAs(pcas) {
    for (let pca of pcas) {
        pca.off();
    }
}
