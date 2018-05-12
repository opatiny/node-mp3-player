// test ledDisplay: show tune information, author and title

'use strict';

const debug = require('debug')('util:test/displayInfo'); // debug library
const i2c = require('i2c-bus').openSync(1);
const delay = require('delay');


// requirering functions
const toc = require('../loadTOC');
const Display = require('../../i2c/display.js');
const CardReader = require('../../i2c/cardReader');

const cardReader = new CardReader(i2c); // new cardReader instance
const display = new Display(i2c);

displayInfo();

async function displayInfo() {
  var cardID = cardReader.status().card;
  display.setIntensity(200);

  while (true) {
    debug('cardID:  ', cardID);

    if (cardID !== 0) {
      display.setText(toc[cardID][0].author, { line: 0 });

      display.setText(toc[cardID][0].title, { line: 1 });
      await delay(100);
    } else {
      allOff();
    }
  }
}

async function allOff() {
  for (let line = 0; line < 3; line++) {
    display.off(line);
  }
  await delay(100);
}
