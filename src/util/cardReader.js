const i2c = require('i2c-bus');
const i2c1 = i2c.openSync(1);

let luminosity=i2c1.readWordSync(8, 0);
let temperature=i2c1.readWordSync(8, 1);
let switchState=i2c1.readWordSync(8, 2);
let card=(i2c1.readWordSync(8, 5)<<16) + i2c1.readWordSync(8, 6)
if (card<0) card+=2**31;


console.log(luminosity, temperature, switchState, card.toString(16));
