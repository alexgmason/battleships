var Ship = require('../src/ship.js');

//Grid size should be 10x10
describe('A ship', function(){
  var ship;
  var SHIPSIZE = 5;

  var shipData = {
    type: 'Battleship',
    size: SHIPSIZE
  };

  beforeEach(function(){
    ship = new Ship(shipData).init();
  });

  it('Should increase it\'s hit count by one each time it is hit', function(){
    ship.recordDamage();
    expect(ship.hitCount).toEqual(1);
  });

  it('Should set sunk to true when the ship is sunk', function(){
    ship.sinkShip();
    expect(ship.sunk).toBeTruthy();
  });
  
  it('Should sink when the hitcounter is equal to the size of the ship', function(){
    for(var i = 0; i < ship.size; i++){
      ship.recordDamage();
    }
    expect(ship.sunk).toBeTruthy();
  });
});
