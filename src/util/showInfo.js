// function that console logs information about a tune

'use strict';

module.exports = function showInfo(context) {
  const display = context.display;
  if (context.info) {
    display.setText(context.currentMusic.author.padEnd(12), { line: 0 });

    display.setText(context.currentMusic.title.padEnd(12), { line: 1 });
  } else {
    display.allOff();
  }
};

