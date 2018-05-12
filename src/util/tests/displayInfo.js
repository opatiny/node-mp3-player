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
  while (true) {
    let cardID = cardReader.status().card;
    display.setIntensity(200);

    debug('cardID:  ', cardID);
    let cardIDCode = cardID.replace('-','');
    if (toc[cardIDCode]) {
      display.setText(toc[cardIDCode][0].author.padEnd(12), { line: 0 });
      display.setText(toc[cardIDCode][0].title.padEnd(12), { line: 1 });
      await delay(100);
    } else {
      display.setText(cardID.padEnd(12), {line:0});
      display.off(1);
    }
  }
}

