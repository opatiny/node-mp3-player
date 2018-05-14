// test ledDisplay: show tune information, author and title

'use strict';

const debug = require('debug')('util:test/displayInfo'); // debug library

const toc = require('../loadTOC');

for (let key of Object.keys(toc)) {
  debug(toc[key][0].author, toc[key][0].title);
}

// console.log(Object.keys(toc));

