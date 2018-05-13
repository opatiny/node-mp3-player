// define display object and functions to write text easily

'use strict';

// require functions
const PCA9685 = require('./pca9685.js');

// set display layout: number of lines and addresses of I2C devices (pcas)
const LINES = [
  [0, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15]
];

// defining Display object
function Display(bus) {
  this.intensity = 100; // default intensity
  this.bus = bus;
  this.lines = LINES.map( // map applies to all elements of an array and returns an array
    (line) => line.map((id) => new PCA9685(this.bus, id)) // creates all pCA9685 instances
  );
}

Display.prototype.setIntensity = function (intensity) {
  this.intensity = intensity;
};

Display.prototype.on = function (line = 0) {
  for (let pca of this.lines[line]) {
    pca.dim(this.intensity);
  }
};

Display.prototype.clear = function () {
  for (let line = 0; line < this.lines.length; line++) {
    this.off(line);
  }
};

Display.prototype.off = function (line = 0) {
  for (let pca of this.lines[line]) {
    pca.off();
  }
};

Display.prototype.setText = function (text, options = {}) {
  let {
    line = 0,
    overflow = 0,
  } = options;

  let pos = 0;
  for (let i = 0; i < text.length; i += 2) {
    let pca = this.lines[line][pos++]; // double square braquets bcause array of arrays
    if (!pca && overflow > 0) {
      line++;
      overflow--;
      pos = 0;
      pca = this.lines[line][pos++];
    }
    if (pca) {
      pca.setTwoChars(text.substr(i, 2), this.intensity);
    }
  }
};

module.exports = Display;
