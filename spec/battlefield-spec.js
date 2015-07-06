var Game = require('../src/game.js');
var Board = require('../src/board.js');

var GRIDSIZE = 10;
var SHIPS = [
  {
    'type': 'Battleship',
    'size': 5
  }
];

//Grid size should be 10x10
describe('A one sided game of Battleships', function(){
  it('Is a board grid of 10 cells across', function(){
    //Create the board
    var board = new Board();
    board.init(GRIDSIZE, SHIPS);

    expect(board.grid.length).toBe(GRIDSIZE);
  });

  it('Is a board grid of 10 cells across', function(){
    //Create the board
    var board = new Board();
    board.init(GRIDSIZE, SHIPS);

    expect(board.grid[GRIDSIZE -1].length).toBe(GRIDSIZE);
  });

  it('Should accept valid grid references, with one letter and one number', function(){
    var GRIDREFERENCE = 'B1';
    var game = new Game();
    game.init(GRIDSIZE, SHIPS);

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(true);
  });

  it('Should accept valid grid references, with one letter and two numbers, where that number is 10', function(){
    var GRIDREFERENCE = 'B10';
    var game = new Game();
    game.init(GRIDSIZE, SHIPS);

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(true);
  });

  it('Should reject invalid grid references, with two letters', function(){
    var GRIDREFERENCE = 'BB';
    var game = new Game();
    game.init(GRIDSIZE, SHIPS);

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with two numbers', function(){
    var GRIDREFERENCE = '11';
    var game = new Game();
    game.init(GRIDSIZE, SHIPS);

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with two letters and one number', function(){
    var GRIDREFERENCE = 'BB1';
    var game = new Game();
    game.init(GRIDSIZE, SHIPS);

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with a letter that positioned within the alphabet, falls outside the valid character range', function(){
    var GRIDREFERENCE = 'K1';
    var game = new Game();
    game.init(GRIDSIZE, SHIPS);

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with one letter and two numbers, where that number is larger than 10', function(){
    var GRIDREFERENCE = 'B11';
    var game = new Game();
    game.init(GRIDSIZE, SHIPS);

    expect(game.checkCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });


  //Grid input out of bounds should be reported

  //A cell that has been targeted cannot be targeted again

  //A cell with no ship returns 'no hit'
  //A cell with a ship returns 'hit' & hit is recorded

  //A Ships last remaining cell sinks the battleship and removes it from the board
  //A board with all ships sank completes the game



});
