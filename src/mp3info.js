'use strict';

var spawn = require('spawn-promise');


module.exports = async function (path) {
  var consoleData = await spawn('mp3info', [path, '-p', '{"name":"%f", "path":"%F", "length":"%S", "bitrate":"%r", "sampling":"%q", "artist":"%a", "title":"%t", "v":"%v", "L":"%L"}']);
  let object = JSON.parse(consoleData);

  for (let prop of Object.keys(object)) {
    object[prop] = object[prop].replace(/\\/g, '');
  }
  return object;
};
