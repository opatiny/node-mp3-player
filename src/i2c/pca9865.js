'use strict';

const BASE_ADDRESS=0b1000000;
const PCA9685_MODE1=0x00; // location for Mode1 register address
const PCA9685_MODE2=0x01; // location for Mode2 reigster address
const delay=require('delay');

function PCA9865(bus, id) {
    this.bus=bus;
    this.id=id | BASE_ADDRESS; 
}


PCA9865.prototype.reset=function() {
    this.bus.writeByteSync(this.id, PCA9685_MODE2, 0x01); // reset
    this.bus.writeByteSync(this.id, PCA9685_MODE1, 0b10100000);	// set up for auto increment
    this.bus.writeByteSync(this.id, PCA9685_MODE2, 0b00000100);// set to output
}

PCA9865.prototype.allOn=function() {
    for (let i=0; i<16; i++) {
        this.setOnOff(i, 0, 0x1000);
    }
}

PCA9865.prototype.allOff=function() {
    for (let i=0; i<16; i++) {
        this.setOnOff(i, 0x1000, 0);
    }
}


PCA9865.prototype.setOnOff=function(i, on, off) {
    this.bus.writeI2cBlockSync(this.id, 0x06+i*4, 4, Buffer.from([on & 0xff, on>>8, off & 0xff, off>>8]));
}

PCA9865.prototype.allDimmed=function(value) {
    for (let i=0; i<16; i++) {
        let randNumber = Math.floor(Math.random()*4096); // Randomize the phaseshift to distribute load. Good idea? Hope so.
        this.bus.writeI2cBlockSync(this.id, 0x06+i*4, 4, Buffer.from([0x00, 0x00, 0xFF, 0x3F]));
    }
}


function ledOn(i2c, ledNumber) {
    for (let i=0; i<NUMBER_DEVICES; i++) {
        i2c.sendByteSync(i+BASE_ADDRESS, 0x01);
    }
}


module.exports=PCA9865;

/*
function writeLED(i2c, on, off) {
    Wire.beginTransmission(_i2cAddress);
    Wire.write(PCA9685_LED0 + 4*ledNumber);

    Wire.write(lowByte(LED_ON));
    Wire.write(highByte(LED_ON));
    Wire.write(lowByte(LED_OFF));
    Wire.write(highByte(LED_OFF));
    
    Wire.endTransmission();
}

writeRegister(PCA9685_MODE1, (byte)0x01);	

writeI2cBlockSync

*/

