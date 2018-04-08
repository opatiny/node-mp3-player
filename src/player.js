'use strict';

const delay = require('delay');
const {
  MPlayer
} = require('mplayer-as-promised');

const MP3_FOLDER = `${__dirname}/../mp3/`;

const mp3info = require('./mp3info');

const mplayer = new MPlayer();

start();

async function start() {
  const context = {
    playlist: require('./playlist'),
    currentSong: '',
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

  context.currentSong = context.playlist.shift();

  context.item = await mplayer.openFile(MP3_FOLDER + context.currentSong);

  return true;
}

async function appendInfo(context) {
  context.info = await mp3info(MP3_FOLDER + context.currentSong);
}

async function showTime(context) {
  if (context.item && context.item.getCurrentTime) {
    let time = await context.item.getCurrentTime();

    console.log(time);
  }
}

async function showInfo(context) {
  console.log(context.info.artist, context.info.title, context.info.length);
}

async function appendToPlayList(context) {


}
