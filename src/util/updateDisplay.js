// function showing 'waiting' or 'playing' on ledDisplay

'use strict';

module.exports = function updateDisplay(context) {
  if (!context.item || !context.item.mplayer) {
    context.display.setText('Waiting');
  } else {
    context.display.setText('Playing');
  }
};
