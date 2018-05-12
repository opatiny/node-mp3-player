// test ledDisplay: show tune information, author and title

'use strict';

const i2c = require('i2c-bus').openSync(1);
const delay = require('delay');


// requirering functions
const toc = require('..//loadTOC');
const Display = require('../../i2c/display.js');
const CardReader = require('../../i2c/cardReader');

const display = new Display(i2c);

while (true) {
  if (CardReader.status.card !== 0) {
    displayInfo();
  } else {
    allOff();
  }
}

async function displayInfo() {
  var cardID = toc[CardReader.status.card];

  display.setIntensity(200);

  display.setText(cardID.author, { line: 0 });

  display.setText(cardID.title, { line: 1 });
  await delay(100);
}

async function allOff() {
  for (let line = 0; line < 3; line++) {
    display.off(line);
  }
  await delay(100);
}

