'use strict';

const PCA9685 = require('./pca9685.js');

const LINES = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14]
];

function Display(bus) {
    this.intensity=100; // default intensity
    this.bus=bus;
    this.lines=LINES.map( 
        line => line.map( id => new PCA9685(this.bus, id))
    );
}

Display.prototype.setIntensity=function(intensity) {
    this.intensity=intensity;
}

Display.prototype.on=function(line = 0) {
    for (let pca of this.lines[line]) {
        pca.dim(this.intensity);
    }
}

Display.prototype.off=function(line = 0) {
    for (let pca of this.lines[line]) {
        pca.off();
    }
}

Display.prototype.setText=function(text, options={}) {
    const {
        line = 0,
        overflow = 0,
    } = options;
    

    
    for (let pca of this.lines[line]) {
        pca.off();
    }
}

module.exports=Display;
