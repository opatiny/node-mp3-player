// function showing 'waiting' or 'playing' on ledDisplay
'use strict';

const debug = require('debug')('util:updateDisplay'); // debug library

module.exports = async function updateDisplay(context) {
  debug(context.currentMusic);

  context.display.setIntensity(Math.max(900 - Math.max(...context.lastLuminosities) * 2, 10));
  if (!context.item || !context.item.mplayer) {
    context.display.setText('Waiting'.padEnd(12));
    context.display.off(1);
    context.display.setText(context.cardReaderStatus.card.replace('-',''), { line: 2 });
  } else {
    context.display.setText(context.currentMusic.author.padEnd(12), { line: 0 });
    context.display.setText(context.currentMusic.title.padEnd(12), { line: 1 });
    if (context.cardReaderStatus.card!=='0000-0000') {
      context.display.setText(context.cardReaderStatus.card.replace('-',''), { line: 2 });
    } else 
if (context.item.getCurrentTime) {
      let time = await context.item.getCurrentTime();

      context.display.setText((`${context.info.length - Math.floor(time)} s`).padEnd(6) + String(context.playlist.length).padStart(2), { line: 2 });
      debug(time);
    }
  }
};
