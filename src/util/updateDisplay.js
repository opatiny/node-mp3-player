// function showing 'waiting' or 'playing' on ledDisplay
'use strict';

const debug = require('debug')('util:updateDisplay'); // debug library

module.exports = function updateDisplay(context) {
  debug(context.currentMusic);
  if (!context.item || !context.item.mplayer) {
    context.display.setText('Waiting'.padEnd(12));
    context.display.off(1);
    context.display.off(2);
  } else {
    context.display.setText(context.currentMusic.author.padEnd(12), { line: 0 });
    context.display.setText(context.currentMusic.title.padEnd(12), { line: 1 });
  }
};
