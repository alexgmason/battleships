var _ = require('underscore');
var stdio = require('stdio');
var Board = require('./board.js');

module.exports = function(gridSize, shipBlueprint){
  'use strict';

  return {
    init: function(){
      this.gridSize = gridSize;
      this.board = new Board(gridSize, shipBlueprint).init();

      this.requestShot();
    },
    //Converts the users inputted coordinates that are in a traditional battleship 'A1'
    //Format into the indexes of an array.
    convertCoordinatesToIndex: function(coordinates){
      var xValue = coordinates.split('')[0].toLowerCase();
      var xIndex = parseInt(this.board.getValidXAxisLetters().indexOf(xValue));
      //Subtract one as we want to convert to zero based numbering
      var yIndex = parseInt(coordinates.split('')[1]) -1;

      return [xIndex, yIndex];
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
          console.log('There was an error', error);
          this.requestShot();
        }

        if(input === 'quit' || input === 'exit'){
          this.exitGame();
        }

        if(this.checkInputtedCoordinatesAreValid(input)){
          indexedCoordinates = this.convertCoordinatesToIndex(input);
          this.fire(indexedCoordinates);
        }
        else{
          console.log('Your coordinates were invalid!\n' +
                      'You should enter them in this format \'A1\'');
          this.requestShot();
        }
      }.bind(this));
    },
    fire: function(coordinates){
      //Returns false if no data
      var previousShot = this.board.getPreviousShotDataForPosition(coordinates);
      var shipAtPosition = this.board.checkIfShipIsAtPosition(coordinates);

      if(previousShot){
        if(previousShot.hit === true){
          if(shipAtPosition.sunk === true){
            console.log('You already sunk a ' + shipAtPosition.type + ' at this postion');
          }
          else{
            console.log('You already fired on this location. The shot was a hit!');
          }
        }
        else if(previousShot.hit === false){
          console.log('You already fired on this location. The shot was a miss!');
        }
        return this.requestShot();
      }

      if(shipAtPosition){
        console.log('HIT!');
        shipAtPosition.recordDamage(coordinates);

        if(this.checkForEndOfGame()){
          console.log('You have sunk all the enemy ships! It took you' + this.board.shots.length + ' attempts');
          this.exitGame();
        }
      }
      else{
        console.log('Splash... You miss!');
      }
      this.board.recordShot(coordinates, shipAtPosition);
      return this.requestShot();
    },
    checkForEndOfGame: function(){
      return _.every(this.board.ships, function(ship){
        return ship.sunk === true;
      });
    }
  };
};
