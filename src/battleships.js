var Game = require('./game.js');
(function(){
  //Set up some constants for the game
  var BOARDSIZE = 10;

  var SHIPS = [
    {
      'type': 'Battleship',
      'size': 5
    },
    {
      'type': 'Destroyer',
      'size': 4
    },
    {
      'type': 'Destroyer',
      'size': 4
    },
  ];

  var game = new Game(BOARDSIZE, SHIPS).init();
})();
