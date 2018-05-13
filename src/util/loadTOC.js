// program allowing to find all tunes and get the information about them

'use strict';

// fs for file system: allows to access and edit files on disk
const debug = require('debug')('util:loadTOC'); // debug library

const fs = require('fs');

const MP3RF_FOLDER = `${__dirname}/../../mp3rf`; // royality free
const MP3_FOLDER = `${__dirname}/../../mp3`; // mp3 database path (relative)

const toc = {}; // object listing all tunes

append(MP3RF_FOLDER);
append(MP3_FOLDER);

module.exports = toc;
debug(Object.keys(toc));

function append(path) {
  if (fs.existsSync(path)) { // verifing if path exists
    let files = fs.readdirSync(path); // list content of a directory, is an array
    for (let file of files) {
      if (fs.lstatSync(`${path}/${file}`).isDirectory()) { // check wether file is a directory
        addDirectory(path, file);
      } else {
        addFile(path, file);
      }
    }
  }
}

// function to add file to object with card unique key as property name
function addFile(path, file) {
  let key = file.substr(0, 9).replace(/[ -]/, '');
  let realFile = file.substr(9).replace(/^_/, '');

  toc[key] = [
    {
      file: `${path}/${file}`,
      author: realFile.replace(/[_ ]-[_ ].*/, '').replace(/_/g, ' '),
      title: realFile.replace(/.*[_ ]-[_ ]/, '').replace(/_/g, ' ').replace(/.mp3$/, '')
    }
  ];
}

// funciton to add a directory to the toc
function addDirectory(path, dirname) {
  let key = dirname.replace(/[^a-fA-F0-9-].*/, '').replace('-', '');
  path = `${path}/${dirname}`; // path is a string
  toc[key] = [];
  let files = fs.readdirSync(path);
  for (let file of files) {
    toc[key].push({
      card: key,
      file: `${path}/${file}`,
      author: file.replace(/[_ ]-[ _].*/, '').replace(/_/g, ' '),
      title: file.replace(/.*[_ ]-[_ ]/, '').replace(/_/g, ' ').replace(/.mp3$/, '')
    });
  }
}
