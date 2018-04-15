'use strict';

const ADDRESS=8;

function CardReader(bus) {
    console.log(this);
    this.bus=bus;
}

CardReader.prototype.status=function(i, on, off) {
    let luminosity=this.bus.readWordSync(ADDRESS, 0);
    let temperature=this.bus.readWordSync(ADDRESS, 1);
    let switchState=this.bus.readWordSync(ADDRESS, 2);
    let card=(this.bus.readWordSync(ADDRESS, 5)<<16) + this.bus.readWordSync(ADDRESS, 6)
    if (card<0) card+=2**31;
    return {
        luminosity,
        temperature,
        switchState,
        card   
    };
}

module.exports=CardReader;
