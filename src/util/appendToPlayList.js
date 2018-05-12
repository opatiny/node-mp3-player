'use strict';

const debug = require('debug')('util:appendToPlayList'); // debug library

module.exports = async function appendToPlayList(context) {
  let card = context.cardReaderStatus.card.replace('-', '');
  debug('current card', card, 'last added card', context.lastAddedCard);
  if (!card) return;
  if (context.lastAddedCard !== card) { // verify wether card has changed
    context.lastAddedCard = card;

    switch (context.cardReaderStatus.switchState) {
      case 3:
        card = 'ffffffff';
        // eslint-disable-next-line
      case 2:
        if (context.item) {
          await context.item.stop();
        }
        context.playlist = [];
        break;
      default:
    }


    if (context.toc[card]) { // if card exists in TOC
      context.playlist.push(...context.toc[card]); // push all elements of array to playlist array (the '...' syntax)
    } else {
      debug('card not found in toc');
    }
  }
};
