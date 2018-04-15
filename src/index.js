'use strict';

const delay = require('delay'); // for delays (async)
const {
  MPlayer
} = require('mplayer-as-promised'); // to play, pause, get remaining time of a tune

const toc=require('./util/loadTOC');

const appendInfo = require('./util/appendInfo');
const updateDisplay = require('./util/updateDisplay');
const showTime = require('./util/showTime');
const showInfo = require('./util/showInfo');
const appendToPlayList = require('./util/appendToPlayList');
const CardReader = require('./i2c/cardReader');
const Display = require('./i2c/display');
const updateCard = require('./util/updateCard');

const mplayer = new MPlayer();

const I2C = require('i2c-bus');

var i2c;
try {
  i2c = I2C.openSync(1);
} catch (e) {
  console.log('i2c bus error', e.toString());
}

start();

async function start() {
  const context = {
    playlist: [], // current playlist
    currentMusic: {}, // current music playing
    item: {}, // pointer to the current mplayer item playing
    info: {}, // extracted info from the mp3
    toc, // list of all the files on the disk
    lastAddedCard: '', // id of the card that was last added
    cardReader: new CardReader(i2c),
    cardInfo: {}, // information about the card
    display: new Display(i2c), 
  };

  while (true) {
    if (await playNextSong(context)) {
      appendInfo(context);

      while (context.item && context.item.mplayer) {
        await showTime(context);
        await showInfo(context);
        await updateCard(context);
        await appendToPlayList(context);
        await updateDisplay(context);
        await delay(1000);

        // possibly we could cancel or go to next song
        if (Math.random() < 0.2) {
          console.log('STOP to test');
          await context.item.stop();
        } else {
          console.log('NOT STOPPED');
        }
      }
    } else {
      await updateCard(context);
      await appendToPlayList(context);
      await updateDisplay(context);
      await delay(1000);
    }
  }
}

async function playNextSong(context) {
  context.currentFile={};
  if (context.playlist.length === 0) return false;

  context.currentMusic =context.playlist.shift();
console.log('Playing', context.currentMusic.file);
  context.item = await mplayer.openFile(context.currentMusic.file);
  console.log('-------------------------------')

  return true;
}

