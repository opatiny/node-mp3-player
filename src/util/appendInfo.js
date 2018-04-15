// program based on https://github.com/PerryWu/pilla-lib-mp3info/blob/master/mp3info.js
// works as a library that extracts information from mp3 files (wraps mp3info to work in javaScript)
'use strict';

var spawn = require('spawn-promise');

module.exports = async function (context) {
  var consoleData = await spawn('mp3info', [context.currentMusic.file, '-p', '{"name":"%f", "path":"%F", "length":"%S", "bitrate":"%r", "sampling":"%q", "artist":"%a", "title":"%t", "v":"%v", "L":"%L"}']);
  let object = JSON.parse(consoleData);

  for (let prop of Object.keys(object)) { // Object.keys() returns an array whose elements are strings corresponding to the enumerable properties found directly upon object. (mozilla)
    object[prop] = object[prop].replace(/\\/g, ''); // replacing / generated before special characters by a space
  }
  context.info = object;
};
