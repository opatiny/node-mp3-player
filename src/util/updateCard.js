'use strict';

module.exports = function updateCard(context) {
  context.cardInfo = context.cardReader.status();
};
