'use strict';

const delay = require('delay');
const {
  MPlayer
} = require('mplayer-as-promised');

const MP3_FOLDER = `${__dirname}/../mp3/`;

const appendInfo = require('./util/appendInfo');
const showTime = require('./util/showTime');
const showInfo = require('./util/showInfo');
const appendToPlayList = require('./util/appendToPlayList');
const cardReader = require('./util/cardReader');

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
    playlist: require('./playlist'),
    path: '',
    info: {},

  };


  while (true) {
    if (await playNextSong(context)) {
      appendInfo(context);

      while (context.item && context.item.mplayer) {
        await showTime(context);
        await showInfo(context);
        await appendToPlayList(context);
        await cardReader(context);
        await delay(1000);
        // possibly we could cancel or go to next song

        if (Math.random() < 0.1) await context.item.stop();
      }
    } else {
      await appendToPlayList(context);
      await delay(1000);
    }
  }
}

async function playNextSong(context) {
  if (context.playlist.length === 0) return false;

  context.path = MP3_FOLDER + context.playlist.shift();

  context.item = await mplayer.openFile(context.path);

  return true;
}

