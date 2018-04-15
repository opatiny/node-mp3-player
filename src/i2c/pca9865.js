'use strict';

const BASE_ADDRESS=0b1000000;
const PCA9685_MODE1=0x00; // location for Mode1 register address
const PCA9685_MODE2=0x01; // location for Mode2 reigster address
const delay=require('delay');

function PCA9865(bus, id) {
    this.bus=bus;
    this.id=id | BASE_ADDRESS; 
    this.init();
}

/** 
 * Reset the devices, set as output and auto increment the register pointer
*/
PCA9865.prototype.init=function() {
    this.bus.writeByteSync(this.id, PCA9685_MODE2, 0x01); // reset
    this.bus.writeByteSync(this.id, PCA9685_MODE1, 0b10100000);	// set up for auto increment
    this.bus.writeByteSync(this.id, PCA9685_MODE2, 0b00000100);// set to output
}

PCA9865.prototype.on=function(mask = 0xFFFF) {
    for (let i=0; i<16; i++) {
        if (mask & 1<<i) {
            this.setOnOff(i, 0, 0x0FFF);
        }
    }
}

PCA9865.prototype.off=function(mask = 0xFFFF) {
    for (let i=0; i<16; i++) {
        if (mask & 1<<i) {
            this.setOnOff(i, 0x0FFF, 0);
        }
    }
}

PCA9865.prototype.dimmed=function(value = 2047, mask = 0xFFFF) {
    for (let i=0; i<16; i++) {
        if (mask & 1<<i) {
            let phaseShift = Math.floor(Math.random()*4096); // Randomize the phaseshift to distribute load. Good idea? Hope so.
            this.setOnOff(i, phaseShift, (phaseShift + value));
        }
    }
}

PCA9865.prototype.setOnOff=function(i, on, off) {
    on = on % 4096;
    off = off % 4096;
    this.bus.writeI2cBlockSync(this.id, 0x06+i*4, 4, Buffer.from([on & 0xff, on>>8, off & 0xff, off>>8]));
}

module.exports=PCA9865;
