// pushing cardReader status to cardReaderStatus

'use strict';

module.exports = function updateCard(context) {
  context.cardReaderStatus = context.cardReader.status();
};
