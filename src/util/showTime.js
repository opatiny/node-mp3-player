// function allowing to know current time

'use strict';

const debug = require('debug')('util:showTime'); // debug library


module.exports = async function showTime(context) {
  if (context.item && context.item.getCurrentTime) {
    let time = await context.item.getCurrentTime();

    context.display.setText((`${context.info.length - Math.floor(time)} s`).padEnd(6)+String(context.playlist.length).padStart(2), { line: 2 });
    debug(time);
  }
};
