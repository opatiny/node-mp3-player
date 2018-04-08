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

const mplayer = new MPlayer();

start();

async function start() {
  const context = {
    playlist: require('./playlist'),
    path: '',
    info: {}
  };

  while (true) {
    if (await playNextSong(context)) {
      appendInfo(context);

      while (context.item && context.item.mplayer) {
        await showTime(context);
        await showInfo(context);
        await appendToPlayList(context);
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

