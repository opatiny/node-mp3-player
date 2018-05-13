// pushing cardReader status to cardReaderStatus

'use strict';

module.exports = function updateCard(context) {
  let status = context.cardReader.status();
  context.cardReaderStatus = status;
  context.lastLuminosities.push(status.luminosity);
  context.lastLuminosities.shift();
};
