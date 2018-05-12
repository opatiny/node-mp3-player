'use strict';

module.exports = async function appendToPlayList(context) {
  let card = context.cardInfo.card;
  if (!card) return;
  if (context.lastAddedCard !== card) { // verify wether card has changed
    context.lastAddedCard = card;

    if (context.toc[card]) { // if card exists in TOC
      context.playlist.push(...context.toc[card]); // push all elements of array to playlist array (the '...' syntax)
    }
  }
};
