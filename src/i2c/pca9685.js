// works as library for pca9685, based on the component datasheet (https://cdn-shop.adafruit.com/datasheets/PCA9685.pdf) and the pca9685 library (https://www.npmjs.com/package/pca9685)

'use strict';

// require funtion
const getCode = require('./alphabet.js').getCode;

// define constants
const BASE_ADDRESS = 0b1000000;
const PCA9685_MODE1 = 0x00; // location for Mode1 register address
const PCA9685_MODE2 = 0x01; // location for Mode2 reigster address

// function allowing to create new pca instances
function PCA9865(bus, id) {
  this.bus = bus;
  this.id = id | BASE_ADDRESS;
  this.init();
}

/**
 * Reset the devices, set as output and auto increment the register pointer
*/
PCA9865.prototype.init = function () {
  this.bus.writeByteSync(this.id, PCA9685_MODE1, 0b10100000); // set up for auto increment
  this.bus.writeByteSync(this.id, PCA9685_MODE2, 0b00000100); // set to output
  this.phaseShifts = [];
  for (let i = 0; i < 16; i++) {
    this.phaseShifts.push(Math.floor(Math.random() * 4096)); // Randomize the phaseshift to distribute load. Good idea? Hope so.
  }
};

/**
 * Turn on (100% intensity) the corresponding output represented by a mask
 * @param {number} [mask=0xFFFF] Mask represents the output to change, by default all (0xFFFF).
 */
PCA9865.prototype.on = function (mask = 0xFFFF) {
  for (let i = 0; i < 16; i++) {
    if (mask & (1 << i)) {
      this.bus.writeI2cBlockSync(this.id, 0x06 + i * 4, 4, Buffer.from([0, 0x10, 0, 0]));
    }
  }
};

/**
 * Turn on (100% intensity) the corresponding output represented by a mask
 * @param {number} [mask=0xFFFF] Mask represents the output to change, by default all (0xFFFF).
 */
PCA9865.prototype.off = function (mask = 0xFFFF) {
  for (let i = 0; i < 16; i++) {
    if (mask & (1 << i)) {
      this.bus.writeI2cBlockSync(this.id, 0x06 + i * 4, 4, Buffer.from([0, 0, 0, 0x10]));
    }
  }
};

/**
 * Dim output to specified intensity for the output represented by a mask
 * @param {number} [intensity=2047] Intensity (value between 0 and 4095)
 * @param {number} [mask=0xFFFF] Mask represents the output to change, by default all (0xFFFF).
 */
PCA9865.prototype.dim = function (intensity = 2047, mask = 0xFFFF) {
  intensity = Math.max(0, Math.min(intensity, 4095));
  for (let i = 0; i < 16; i++) {
    if (mask & (1 << i)) {
      this.setOnOff(i, this.phaseShifts[i], (this.phaseShifts[i] + intensity));
    }
  }
};

PCA9865.prototype.setOnOff = function (i, on, off) {
  on = on % 4096;
  off = off % 4096;
  this.bus.writeI2cBlockSync(this.id, 0x06 + i * 4, 4, Buffer.from([on & 0xff, on >> 8, off & 0xff, off >> 8]));
};

PCA9865.prototype.setTwoChars = function (text, intensity = 2047) {
  text = text.toUpperCase().replace(/[^A-Z0-9 -]/g, '');
  let mask = 0;
  let char1 = text.charAt(0);
  let char2 = text.charAt(1);
  if (char1) {
    mask += getCode(char1);
  }
  if (char2) {
    mask += getCode(char2) << 8;
  }
  this.dim(intensity, mask);
  this.off(mask ^ 0xFFFF);
};

module.exports = PCA9865;
