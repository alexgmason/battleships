var stdio = require('stdio');
var Board = require('./board.js');

module.exports = function(gridSize, shipBlueprint){
  'use strict';

  return {
    init: function(){
      this.gridSize = gridSize;
      this.board = new Board(gridSize, shipBlueprint).init();

      return this;
    },
    //Converts the users inputted coordinates that are in a traditional battleship 'A1'
    //Format into the indexes of an array.
    convertCoordinatesToIndex: function(coordinates){
      var yIndex;
      var xValue = coordinates.split('')[0].toLowerCase();
      var xIndex = parseInt(this.getValidXAxisLetters().indexOf(xValue));
      //Subtract one as we want to convert to zero based numbering

      if(coordinates.length === 2){
        yIndex = parseInt(coordinates.split('')[1]) -1;
      }
      //Can only be 9.
      else if(coordinates.length === 3){
        yIndex = 9;
      }

      return [xIndex, yIndex];
    },
    //Returns an array of alphabetised letters with the length of the grid size
    getValidXAxisLetters: function(){
      return 'abcdefghijklmnopqrstuvwxyz'.split('').splice(0, this.gridSize);
    },
    //Takes the grid size and returns a regex that will match letters up to that
    //position in the alphabet
    getCoordinatesLetterRegex: function(){
      var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      var letterLimit = alphabet[this.gridSize -1];

      return new RegExp('[a-' + letterLimit + ']', 'i');
    },
    checkInputtedCoordinatesAreValid: function(coordinates){
      var letterRegex = this.getCoordinatesLetterRegex();

      //Check that the inputted coordinate is either two or three characters long
      if(!(coordinates.length >= 2 && coordinates.length <= 3)){
        return false;
      }
      //Check first character is a letter
      else if (!coordinates.charAt(0).match(letterRegex)) {
        return false;
      }
      //Check second character is a number
      else if (isNaN(coordinates.charAt(1))){
        return false;
      }
      //Check the second character isn't '0', which is an invalid number as our
      //grid goes 0-10
      else if(parseInt(coordinates.charAt(1)) === 0){
        return false;
      }

      //If there is a third character. For example 'A10' then test that too
      //Only Valid character is 0;
      if(coordinates.length === 3){
        if(parseInt(coordinates.charAt(2)) !== 0){
          return false;
        }
      }
      return true;
    },
    exitGame: function(){
      process.exit();
    },
    requestShot: function(){
      stdio.question('Set your coordinates', function (error, input) {
        var indexedCoordinates;
        if(error){
          console.log('There was an error retrying...', error);
          this.requestShot();
        }

        if(input === 'quit' || input === 'exit'){
          this.exitGame();
        }

        if(this.checkInputtedCoordinatesAreValid(input)){
          indexedCoordinates = this.convertCoordinatesToIndex(input);

          this.board.fire(indexedCoordinates);

          if(this.board.checkAllShipsSunk()){
            console.log('You Win!!! You have sunk all the enemy ships!\n' +
                        'It took you' + this.shots.length + ' attempts');
            this.exitGame();
          }
          this.requestShot();
        }
        else{
          console.log('Your coordinates were invalid!\n' +
                      'You should enter them in this format \'A1\'');
          this.requestShot();
        }
      }.bind(this));
    },
  };
};
