'use strict';

const fs=require('fs');

const MP3RF_FOLDER = `${__dirname}/../../mp3rf`; // royality free
const MP3_FOLDER = `${__dirname}/../../mp3`; // mp3 database path (relative)

const musics={};

append(MP3RF_FOLDER);
append(MP3_FOLDER);

module.exports=musics;

function append(path) {
  if (fs.existsSync(path)) {
    let files=fs.readdirSync(path);
    for (let file of files) {
      if (fs.lstatSync(path+'/'+file).isDirectory()) {
        addDirectory(path, file);
      } else {
        addFile(path, file);
      }
    }
  }
}

function addFile(path, file) {
  let key=file.substr(0,9);
  let realFile=file.substr(10);
  musics[key]=[{
    file: path+'/'+file,
    author: realFile.replace(/_-_.*/,'').replace(/_/g,' '),
    title: realFile.replace(/.*_-_/,'').replace(/_/g,' ').replace(/.mp3$/,'')
  }];
}

function addDirectory(path, dirname) {
  let key=dirname;
  path=path+'/'+dirname;
  musics[key]=[];
  let files=fs.readdirSync(path);
  for (let file of files) {
    musics[key].push({
      file: path+'/'+file,
      author: file.replace(/_-_.*/,'').replace(/_/g,' '),
      title: file.replace(/.*_-_/,'').replace(/_/g,' ').replace(/.mp3$/,'')
    });
  }
}