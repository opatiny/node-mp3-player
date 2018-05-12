// main program running on the CHIP.

'use strict';

// requirering libraries
const debug = require('debug')('index'); // debug library
const delay = require('delay'); // for delays (async)
const {
  MPlayer
} = require('mplayer-as-promised'); // to play, pause, get remaining time of a tune

// requirering functions
const toc = require('./util/loadTOC');
const appendInfo = require('./util/appendInfo');
const updateDisplay = require('./util/updateDisplay');
const showTime = require('./util/showTime');
const appendToPlayList = require('./util/appendToPlayList');
const CardReader = require('./i2c/cardReader');
const Display = require('./i2c/display');
const updateCard = require('./util/updateCard');
const exec = require('child_process').exec; // library that allows to execute ba
sh

// creating new instances of MPlayer and I2C
const mplayer = new MPlayer();
const I2C = require('i2c-bus');

// connecting on I2C bus 1
var i2c;
try {
  i2c = I2C.openSync(1); // Synchronous open (not a promise). Returns a new Bus object.
} catch (e) {
  debug('i2c bus error', e.toString());
}

// initializing
start();

async function start() {
  const context = {
    playlist: [], // current playlist
    currentMusic: {}, // current music playing
    item: {}, // pointer to the current mplayer item playing
    info: {}, // extracted info from the mp3
    toc, // list of all the files on the disk
    lastAddedCard: '00000000', // id of the card that was added at last
    cardReader: new CardReader(i2c), // new cardReader instance
    cardReaderStatus: {}, // information about the card
    display: new Display(i2c), // new ledDisplay instance
    lastLuminosities: (new Array(10)).fill(500) 
  };

  while (true) {
    if (await playNextSong(context)) {
      appendInfo(context);

      while (context.item && context.item.mplayer) {
        await showTime(context);
        await updateCard(context);
        await appendToPlayList(context);
        await updateDisplay(context);
        await delay(1000);

        // possibly we could cancel or go to next song
        /*
        if (Math.random() < 0.2) {
          debug('STOP to test');
          await context.item.stop();
        } else {
          debug('NOT STOPPED');
        }
        */
      }

      if (context.cardReaderStatus.card==='ffffffff') {
        exec('shutdown -h now');
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
  context.currentFile = {};
  if (context.playlist.length === 0) return false;

  context.currentMusic = context.playlist.shift();
  debug('Playing', context.currentMusic.file);
  context.item = await mplayer.openFile(context.currentMusic.file);
  debug('-------------------------------');

  return true;
}
