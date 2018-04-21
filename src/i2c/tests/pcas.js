// test ledDisplay and define various functions

'use strict';

// require libraries
const i2c = require('i2c-bus').openSync(1);

// require functions
const PCA9685 = require('../pca9685.js');

// create 15 new instances of pca
const pcas = createPCAs(i2c, 0, 14);

// dim on and off all segments of ledDisplay
test();

function test() {
  for (let i = 0; i < 5; i++) {
    for (let intensity = 0; intensity < 200; intensity += 10) {
      allDimmedPCAs(pcas, intensity);
    }
    for (let intensity = 200; intensity >= 0; intensity -= 10) {
      allDimmedPCAs(pcas, intensity);
    }
  }
}

function createPCAs(bus, from, to) {
  let pcas = [];
  for (let i = from; i <= to; i++) {
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
    pca.dim(intensity, 0x00FF);
  }
}

function allOffPCAs(pcas) {
  for (let pca of pcas) {
    pca.off();
  }
}

module.exports = {
  allDimmedPCAs,
  allOffPCAs,
  allOnPCAs,
  createPCAs };
