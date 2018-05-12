// function that console logs information about a tune

'use strict';

module.exports = function showInfo(context) {
  if (context.info) {
    console.log(context.info.artist, context.info.title, context.info.length);
  }
};
