// pushing cardReader status to cardReaderStatus

'use strict';

module.exports = async function updateCard(context) {
  let status = await context.cardReader.status();
  context.cardReaderStatus = status;
  context.lastLuminosities.push(status.luminosity); // add one element to lastLuminosities array
  context.lastLuminosities.shift(); // slide array values from one position deleting oldest one
};
