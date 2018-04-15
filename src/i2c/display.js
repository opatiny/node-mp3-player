'use strict';

const PCA9865

function Display(bus) {
    this.bus=bus;
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

module.exports=Display;
