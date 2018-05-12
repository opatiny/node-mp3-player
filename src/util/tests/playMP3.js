'use strict';

const {
  MPlayer
} = require('mplayer-as-promised'); // to play, pause, get remaining time of a tune

const mplayer = new MPlayer();

mplayer.openFile(`${__dirname}/../../../mp3rf/363f-17ef_Nature_Boy_-_Rebirth.mp3`);
