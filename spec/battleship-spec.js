var Game = require('../src/game.js');
var Board = require('../src/board.js');
var Ship = require('../src/ship.js');

var GRIDSIZE = 10;
var SHIPS = [
  {
    'type': 'Battleship',
    'size': 5
  }
];

//Grid size should be 10x10
describe('A one sided game of Battleships', function(){
  it('Should accept valid grid references, with one letter and one number', function(){
    var GRIDREFERENCE = 'B1';
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(true);
  });

  it('Should accept valid grid references, with one letter and two numbers, where that number is 10', function(){
    var GRIDREFERENCE = 'B10';
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(true);
  });

  it('Should reject invalid grid references, with two letters', function(){
    var GRIDREFERENCE = 'BB';
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with two numbers', function(){
    var GRIDREFERENCE = '11';
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with two letters and one number', function(){
    var GRIDREFERENCE = 'BB1';
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with a letter that positioned within the alphabet, falls outside the valid character range', function(){
    var GRIDREFERENCE = 'K1';
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with one letter and two numbers, where that number is larger than 10', function(){
    var GRIDREFERENCE = 'B11';
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should convert an alphanumeric coordinates into an array of integers', function(){
    var game = new Game(GRIDSIZE, SHIPS);
    game.init();

    var coordinates = 'C1';
    var convertedCoordinates = game.convertCoordinatesToIndex(coordinates);

    expect(convertedCoordinates).toEqual([2,1]);
  });

  it('Should create a ship that returns an array of coordinates of passed in size', function(){
    var SHIPSIZE = 5;
    var shipBlueprint = {
      type: 'Battleship',
      size: SHIPSIZE,
    };

    var coordinates = false;
    var board = new Board(GRIDSIZE, shipBlueprint).init();

    while(!coordinates){
      jasmine.log('derp');
      coordinates = board.attemptToPositionShip(SHIPSIZE);
    }

    console.log('coordinates', coordinates);
    expect(coordinates.length).toEqual(SHIPSIZE);
  });

  it('Given a ship on the board, given a coordinate at that ships location. A check to see if a ship at that location should be true', function(){
    var SHIPSIZE = 5;
    var shipBlueprint = {
      type: 'Battleship',
      size: SHIPSIZE,
    };

    var coordinates = false;
    var board = new Board(shipBlueprint).init();

    while(!coordinates){
      coordinates = board.attemptToPositionShip(SHIPSIZE);
    }

    var coordinateToCheck = coordinates[0];

    var shipIsAtPosition = checkIfShipIsAtPosition(coordinateToCheck);
    expect(shipIsAtPosition).toEqual(true);
  });

  //Grid input out of bounds should be reported

  //A cell that has been targeted cannot be targeted again

  //A cell with no ship returns 'no hit'
  //A cell with a ship returns 'hit' & hit is recorded

  //A Ships last remaining cell sinks the battleship and removes it from the board
  //A board with all ships sank completes the game



});
