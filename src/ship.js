module.exports = function(shipData){
  'use strict';

  return {
    init: function(){
      this.coordinates = shipData.coordinates;
      this.size = shipData.size;
      this.type = shipData.type;
      this.hitCount = 0;
      this.sunk = false;

      return this;
    },
    //Increase the ships hit counter when hit.
    //Note we do not record the shot location as a simple comparison of the
    //hit counter and the ships size will suffice.
    recordDamage: function(){
      this.hitCount++;

      if(this.hitCount === this.size){
        this.sinkShip();
      }
    },
    sinkShip: function(){
      console.log('You have sunk a ' + this.type);
      this.sunk = true;
    }
  };
};
