// function showing 'waiting' or 'playing' on ledDisplay

const debug = require('debug')('util:updateDisplay'); // debug library

'use strict';

module.exports = function updateDisplay(context) {
  debug(context.currentMusic);
  debug(context.item);
  if (!context.item || !context.item.mplayer) {
    context.display.setText('Waiting'.padEnd(12));
  } else {
    context.display.setText('Playing'.padEnd(12));
  }
};
