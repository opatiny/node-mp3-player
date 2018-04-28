'use strict';


module.exports = async function appendToPlayList(context) {
  let card = context.cardInfo.card;
  if (!card) return;
  if (context.lastAddedCard !== card) {
    context.lastAddedCard = card;

    if (context.toc[card]) {
      context.playlist.push(...context.toc[card]);
    }
  }
};
