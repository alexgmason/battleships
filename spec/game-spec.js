var Game = require('../src/game.js');

//Grid size should be 10x10
describe('A one sided game of Battleships game object', function(){
  var game;

  var GRIDSIZE = 10;
  var SHIPS = [
    {
      'type': 'Battleship',
      'size': 5
    }
  ];

  beforeEach(function(){
    game = new Game(GRIDSIZE, SHIPS);
    game.init();
  });

  afterEach(function() {
    game = undefined;
  });

  it('Should convert an alphanumeric coordinates into an array of integers indexed zero', function(){
    var coordinates = 'C1';
    var convertedCoordinates = game.convertCoordinatesToIndex(coordinates);

    expect(convertedCoordinates).toEqual([2,0]);
  });

  it('Should return an array of alphabetised letters of the length of grid size', function(){
    var expectedArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g' ,'h', 'i', 'j'];
    expect(game.getValidXAxisLetters()).toEqual(expectedArray);
  });

  it('Should return a regex that matchtes valid letters', function(){
    var expectedRegex = /[a-j]/i;
    expect(game.getCoordinatesLetterRegex()).toEqual(expectedRegex);
  });

  it('Should accept valid grid references, with one letter and one number', function(){
    var GRIDREFERENCE = 'B1';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(true);
  });

  it('Should accept valid grid references, with one letter and two numbers, where that number is 10', function(){
    var GRIDREFERENCE = 'B10';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(true);
  });

  it('Should reject invalid grid references, with two letters', function(){
    var GRIDREFERENCE = 'BB';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with two numbers', function(){
    var GRIDREFERENCE = '11';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with two letters and one number', function(){
    var GRIDREFERENCE = 'BB1';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with one letter and one number, where that number is 0', function(){
    var GRIDREFERENCE = 'B0';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with a letter that positioned within the alphabet, falls outside the valid character range', function(){
    var GRIDREFERENCE = 'K1';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should reject invalid grid references, with one letter and two numbers, where that number is larger than 10', function(){
    var GRIDREFERENCE = 'B11';
    expect(game.checkInputtedCoordinatesAreValid(GRIDREFERENCE)).toBe(false);
  });

  it('Should continue the game when every ship has NOT been sunk', function(){
    expect(game.checkForEndOfGame()).toEqual(false);
  });

  it('Should end the game when every ship has been sunk', function(){
    game.board.ships[0].sunk = true;
    expect(game.checkForEndOfGame()).toEqual(true);
  });

});