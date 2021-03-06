var Board = require('../src/board.js');

describe('A one sided game of Battleships board that is responsible for creating/positioning ships and keeping track of their positions on the board', function(){
  var coordinates;
  var board;

  var GRIDSIZE = 10;
  var SHIPSIZE = 5;
  var shipBlueprint = [
    { type: 'Battleship',
      size: SHIPSIZE,
    }
  ];

  beforeEach(function(){
    coordinates = false;
    board = new Board(GRIDSIZE, shipBlueprint).init();
  });

  it('Given a ship blueprint, should instantiate the ship and add it to the ships array', function(){
    expect(board.ships.length).toEqual(1);
    board.addNewShip(shipBlueprint);
    expect(board.ships.length).toEqual(2);
  });

  it('Should position a given ship. and return an array of coordinates of passed in size', function(){
    while(!coordinates){
      coordinates = board.attemptToPositionShip(SHIPSIZE);
    }
    expect(coordinates.length).toEqual(SHIPSIZE);
  });

  it('Should increment the invalidShots counter when a position that was a miss was previously fired upon', function(){
    board.fire([3,0]);
    expect(board.invalidShots).toBe(0);
    board.fire([3,0]);
    expect(board.invalidShots).toBe(1);
  });

  it('Should increment the invalidShots counter when a position that was a hit was previously fired upon', function(){
    var shotCoordinates = board.ships[0].coordinates[0];
    board.fire(shotCoordinates);
    expect(board.invalidShots).toBe(0);
    board.fire(shotCoordinates);
    expect(board.invalidShots).toBe(1);
  });

  it('Should increment the length of the shots array when an empty position is fired upon for the first time', function(){
    var shotCoordinates = board.ships[0].coordinates[0];
    board.fire(shotCoordinates);
    expect(board.shots.length).toBe(1);
  });

  it('Should NOT increment the length of the shots array when an empty position is fired upon for the second time', function(){
    var shotCoordinates = board.ships[0].coordinates[0];
    board.fire(shotCoordinates);
    board.fire(shotCoordinates);
    expect(board.shots.length).toBe(1);
  });

  it('Should record damage to a ship when that postion is fired upon for the first time', function(){
    var shotCoordinates = board.ships[0].coordinates[0];
    board.fire(shotCoordinates);
    expect(board.ships[0].hitCount).toBe(1);
  });

  it('Should NOT record damage to a ship when that postion is fired upon for the second time', function(){
    var shotCoordinates = board.ships[0].coordinates[0];
    board.fire(shotCoordinates);
    board.fire(shotCoordinates);
    expect(board.ships[0].hitCount).toBe(1);
  });

  it('A recorded shot should be added to the shots array', function(){
    var existingShots = board.shots.length;
    board.recordShot([1, 0]);
    expect(board.shots.length).toEqual(existingShots + 1);
  });

  it('Given an empty board and a shot at a specific empty location, that same position should return the correct shot data', function(){
    var shotCoordinates = [3, 4];
    var expectedHitData = {
      coordinates: [3 ,4],
      hit: false
    };

    board.recordShot(shotCoordinates);

    expect(board.getPreviousShotDataForPosition(shotCoordinates)).toEqual(expectedHitData);
  });

  it('Given a ship placed on the board and a shot recorded at that position, given that same position should return the correct shot data', function(){
    var shotCoordinates = board.ships[0].coordinates[0];
    var expectedHitData = {
      coordinates: shotCoordinates,
      hit: true
    };

    board.recordShot(shotCoordinates, board.ships[0]);

    expect(board.getPreviousShotDataForPosition(shotCoordinates)).toEqual(expectedHitData);
  });

  it('Given an empty board. A check to see if a ship is at a given location should be undefined', function(){
    var coordinateToCheck = [0,5];
    var shipIsAtPosition = board.getShipAtPosition(coordinateToCheck);
    expect(shipIsAtPosition).toEqual(undefined);
  });

  it('Given a ship positioned on the board, then given a coordinate at that ships location. A check to see if a ship is at that location should return that ship', function(){
    board.init();

    while(!coordinates){
      coordinates = board.attemptToPositionShip(SHIPSIZE);
    }

    board.ships[0] = {
      coordinates: coordinates
    };

    var coordinateToCheck = coordinates[0];
    var shipIsAtPosition = board.getShipAtPosition(coordinateToCheck);
    expect(shipIsAtPosition).toEqual(board.ships[0]);
  });

  it('Returns random orientation in a valid format', function(){
    var orientation = board.getRandomOrientation();

    var orientationIsValid = orientation === 'horizontal' || orientation === 'vertical';
    expect(orientationIsValid).toBeTruthy();
  });

  it('Returns random coordinates that are within the bounds of the board', function(){
    var coordinates = board.getRandomLocation();

    expect(coordinates.length).toBe(2);

    var firstCoordinateIsLessThanEqualToGridSize = coordinates[0] <= GRIDSIZE;
    var secondCoordinateIsLessThanEqualToGridSize = coordinates[1] <= GRIDSIZE;

    expect(firstCoordinateIsLessThanEqualToGridSize).toBeTruthy();
    expect(secondCoordinateIsLessThanEqualToGridSize).toBeTruthy();
  });

  it('Given a grid where ships have not been sunk. Checking that all ships are sunk should be false', function(){
    expect(board.checkAllShipsSunk()).toEqual(false);
  });

  it('Given a grid where ships have been sunk. Checking that all ships are sunk should be false', function(){
    board.ships[0].sunk = true;
    expect(board.checkAllShipsSunk()).toEqual(true);
  });
});
