// function allowing to know current time

'use strict';

module.exports = async function showTime(context) {
  if (context.item && context.item.getCurrentTime) {
    let time = await context.item.getCurrentTime();

    console.log(time);
  }
};
