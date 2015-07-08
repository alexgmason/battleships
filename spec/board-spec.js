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

  it('Given a ship blueprint, should add instantiate the ship and add it to the ships array', function(){
    expect(board.ships.length).toEqual(1);
    board.addNewShip(shipBlueprint);
    expect(board.ships.length).toEqual(2);
  });

  it('Should position a given ship. By returning an array of coordinates of passed in size', function(){
    while(!coordinates){
      coordinates = board.attemptToPositionShip(SHIPSIZE);
    }
    expect(coordinates.length).toEqual(SHIPSIZE);
  });


  it('Given an empty board and a shot at a specific location, that same position should return the correct shot data', function(){
    var shotCoordinates = [3, 4];
    var expectedHitData = {
      coordinates: [3 ,4],
      hit: false
    };

    board.recordShot(shotCoordinates);

    expect(board.getPreviousShotDataForPosition(shotCoordinates)).toEqual(expectedHitData);
  });

  it('Given a ship placed on the board and a shot recorded at that position, given that same position should return the correct shot data', function(){
    shotCoordinates = board.ships[0].coordinates[0];
    var expectedHitData = {
      coordinates: shotCoordinates,
      hit: true
    };

    board.recordShot(shotCoordinates, board.ships[0]);

    expect(board.getPreviousShotDataForPosition(shotCoordinates)).toEqual(expectedHitData);
  });

  it('Given an empty board. A check to see if a ship is at a given location should be false', function(){
    board.init();

    var coordinateToCheck = [0,5];
    var shipIsAtPosition = board.checkIfShipIsAtPosition(coordinateToCheck);
    expect(shipIsAtPosition).toEqual(false);
  });

  it('Given a ship positioned on the board, then given a coordinate at that ships location. A check to see if a ship is at that location should be true', function(){
    board.init();

    while(!coordinates){
      coordinates = board.attemptToPositionShip(SHIPSIZE);
    }

    board.ships[0] = {
      coordinates: coordinates
    };

    var coordinateToCheck = coordinates[0];
    var shipIsAtPosition = board.checkIfShipIsAtPosition(coordinateToCheck);
    expect(shipIsAtPosition).toEqual(true);
  });

  it('Returns random orientation in a valid format', function(){
    var orientation = board.getRandomOrientation();

    var orientationIsValid = orientation === 'horizontal' || orientation === 'vertical';
    expect(orientationIsValid).toBeTruthy();
  });

  it('Returns random coordinates in a valid format', function(){
    var coordinates = board.getRandomLocation();

    expect(coordinates.length).toBe(2);

    var firstCoordinateIsLessThanEqualToGridSize = coordinates[0] <= GRIDSIZE;
    var secondCoordinateIsLessThanEqualToGridSize = coordinates[1] <= GRIDSIZE;

    expect(firstCoordinateIsLessThanEqualToGridSize).toBeTruthy();
    expect(secondCoordinateIsLessThanEqualToGridSize).toBeTruthy();
  });
});
