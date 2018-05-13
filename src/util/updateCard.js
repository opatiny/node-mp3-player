// pushing cardReader status to cardReaderStatus

'use strict';

module.exports = async function updateCard(context) {
  let status = await context.cardReader.status();
  context.cardReaderStatus = status;
  context.lastLuminosities.push(status.luminosity);
  context.lastLuminosities.shift();
};
