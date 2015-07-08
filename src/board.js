var _ = require('underscore');
var Ship = require('./ship.js');

module.exports = function(gridSize, shipBlueprints){
  'use strict';

  return{
    init: function(){
      this.gridSize = gridSize;
      this.ships = [];
      this.shots = [];

      //Add the ships
      for(var i = 0; i < shipBlueprints.length; i++){
        this.addNewShip(shipBlueprints[i]);
      }
      return this;
    },
    addNewShip: function(shipBlueprint){
      //Attempt to postion a ship on the grid. the 'attemtToPositionShip' returns
      //False if a ship could not be placed. It returns the ship coordinates if
      //it was successfully placed
      while(!shipBlueprint.coordinates){
        shipBlueprint.coordinates = this.attemptToPositionShip(shipBlueprint.size);
      }
      this.ships.push(new Ship(shipBlueprint).init());
    },
    attemptToPositionShip: function(size){
      //First choose a random location on the grid
      var startLocation = this.getRandomLocation();
      var orientation = this.getRandomOrientation();
      var coordinates = [];
      if(orientation === 'horizontal'){
        //If the distance between the start position and the edge of the grid is
        //larger than the ship can accomodate then return
        if(startLocation[0] + size > this.gridSize){
          return false;
        }
        //else we are going to check each position for another ship!
        else{
          for(var i = 0; i < size; i++){
            if(this.checkIfShipIsAtPosition([startLocation[0] + i, startLocation[1]])){
              return false;
            }
            //Push the valid coordinate onto the array
            coordinates.push([startLocation[0] + i, startLocation[1]]);
          }
          return coordinates;
        }
      }
      else if(orientation === 'vertical'){
        //If the distance between the start position and the edge of the grid is
        // larger than the ship can accomodate
        if(startLocation[1] + size > this.gridSize){
          return false;
        }
        //else we are going to check each intended position for clash with another ship!
        else{
          for(var j = 0; j < size; j++){
            if(this.checkIfShipIsAtPosition([startLocation[0], startLocation[1] + j])){
              return false;
            }
            //Push the valid coordinate onto the array
            coordinates.push([startLocation[0], startLocation[1] + j]);
          }
          return coordinates;
        }
      }
    },
    //Looks up a coordinate in the shot history array and returns the previous
    //shot data for that position.
    getPreviousShotDataForPosition: function(coordinates){
      return _.find(this.shots, function(shot){
        return _.isEqual(shot.coordinates, coordinates);
      });
    },
    recordShot: function(coordinates, shipAtPosition){
      var hit = false;

      if(typeof shipAtPosition !== 'undefined'){
        hit = true;
      }
      this.shots.push({
        coordinates: coordinates,
        hit: hit
      });
    },
    getRandomLocation: function(){
      return [Math.floor(Math.random() * this.gridSize), Math.floor(Math.random() * this.gridSize)];
    },
    getRandomOrientation: function(){
      if(Math.random() < 0.5){
        return 'horizontal';
      }
      return 'vertical';
    },
    checkIfShipIsAtPosition: function(targetCoordinates){
      return _.find(this.ships, function(ship){
        return _.some(ship.coordinates, function(coordinate){
          if(targetCoordinates[0] === coordinate[0] && targetCoordinates[1] === coordinate[1]){
            return true;
          }
        });
      });
    },
  };
};
