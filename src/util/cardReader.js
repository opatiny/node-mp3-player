'use strict';

module.exports = function cardReader(context) {
  let i2c = context.i2c;
  if (i2c) {
    context.cardReader = {
      luminosity: i2c.readWordSync(8, 0),
      temperature: i2c.readWordSync(8, 1),
      switchState: i2c.readWordSync(8, 2),
      card: (i2c.readWordSync(8, 5) << 16) + i2c.readWordSync(8, 6),
      mode: i2c.readWordSync(8, 8)
    };
    if (context.cardReader.card < 0) context.cardReader.card += 2 ** 31; // avoiding negative numbers due to arduino numbers length
    context.cardReader.cardID = context.cardReader.cardID.toString(16);
    console.log('Card reader', context.cardReader);
  }
};
