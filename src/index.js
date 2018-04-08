'use strict';

var mp3info = require('./mp3info');


mp3info(`${__dirname}/test2.mp3`)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
