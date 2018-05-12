// pushing cardReader status to cardReaderStatus

'use strict';

module.exports = function updateCard(context) {
  let status=context.cardReader.status();
  context.cardReaderStatus = status;
console.log(context.lastLuminosities)
  context.lastLuminosities.push(status.luminosity);
  context.lastLuminosities.shift();
};
