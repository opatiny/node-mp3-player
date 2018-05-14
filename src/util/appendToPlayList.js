'use strict';

const debug = require('debug')('util:appendToPlayList'); // debug library
const delay = require('delay'); // for delays (async)

module.exports = async function appendToPlayList(context) {
  let card = context.cardReaderStatus.card.replace('-', '');

  if (context.cardReaderStatus.switchState === 3) {
    card = 'ffffffff';
  }
  debug('current card', card, 'last added card', context.lastAddedCard);
  if (!card) return;
  if (context.lastAddedCard !== card && card !== '00000000') { // verify wether card has changed
    context.lastAddedCard = card;

    if (context.cardReaderStatus.switchState === 2 || context.cardReaderStatus.switchState === 3) {
      if (context.item && context.item.stop) {
        await context.item.stop();
        await delay(100);
      }
      context.playlist = [];
    }


    if (context.toc[card]) { // if card exists in TOC
      context.playlist.push(...context.toc[card]); // push all elements of array to playlist array (the '...' syntax)
    } else {
      debug('card not found in toc');
    }
  }
};
