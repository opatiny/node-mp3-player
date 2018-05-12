// function allowing to know current time

'use strict';

module.exports = async function showTime(context) {
  if (context.item && context.item.getCurrentTime) {
    let time = await context.item.getCurrentTime();
    context.display.setText(time, { line: 2 });
    console.log(time);
  }
};
