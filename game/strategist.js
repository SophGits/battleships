var Helper = require('./helper');

function Strategist(grid) {
  const battleship = 5,
        destroyer = 4;
  this.vessels = [battleship, destroyer, destroyer];
  this.grid = grid;
  this.placedVessels = [];
}

Strategist.prototype.placeVessels = function(position) {
  var vesselPosition = position || 0,
      startPosition = this.chooseStartPosition(),
      orientation = Helper.pickRandom(),
      vessel = this.vessels[vesselPosition];

  this.placeVessel(startPosition, orientation, vessel, vesselPosition);

  if(vesselPosition < this.vessels.length -1) {
    this.placeVessels(++ vesselPosition);
  }
};

Strategist.prototype.chooseStartPosition = function() {
  return Helper.pickRandom(this.grid.coordinates().length);
}

Strategist.prototype.placeVessel = function(startPosition, orientation, length, num) {
  var vesselSquares = orientation > 0.5 ? this.placeVertically(startPosition, length) : this.placeHorizontally(startPosition, length);
  this.grid.setUpVessel(vesselSquares, num);
  this.placedVessels.push(vesselSquares);
};

Strategist.prototype.placeVertically = function(startPosition, length) {
  var coordinates = [];
  for(var i=0; i < length; i++) {
    var coord = parseInt(startPosition + i*this.grid.size);
    coordinates.push(this.grid.coordinates()[coord]);
  }

  if(this.validate(coordinates, length)) {
    return coordinates;
  } else {
    return this.placeVertically(this.chooseStartPosition(), length);
  }
};

Strategist.prototype.placeHorizontally = function(startPosition, length) {
  var coordinates = this.grid.coordinates().slice(startPosition, startPosition + length);

  if(this.validate(coordinates, length, 'horizontal')) {
    return coordinates;
  } else {
    return this.placeHorizontally(this.chooseStartPosition(), length);
  }
};

Strategist.prototype.validate = function(coordinates, length, horizontal) {

  if(horizontal) {
  // To prevent [G9,G10,H1,H2]
    if(!coordinates[coordinates.length-1]) {
      return false;
    }
    var sameLetter = coordinates[0].slice(0,1) === coordinates[coordinates.length-1].slice(0,1);
    var correctIncrement = function() {
      var start = parseInt(coordinates[0].slice(1));
      var end = parseInt(coordinates[coordinates.length-1].slice(1));
      if(end - start === length-1) {
        return true;
      }
    }
    if(!sameLetter || !correctIncrement()) {
      return false;
    }
  }

  var noOverlap = coordinates.every(function(coordinate) {
    var placedVesselCoordinates = [].concat.apply([], this.placedVessels);
    return placedVesselCoordinates.indexOf(coordinate) === -1;
  }.bind(this));
  if(!noOverlap) {
    return false;
  }

  var notUndefined = coordinates.every(function(coordinate){
    return !!coordinate === true;
  });
  if(!notUndefined) {
    return false;
  }

  var correctLength = coordinates.length === length;
  if(!correctLength) {
    return false;
  }

  return true;
}

module.exports = Strategist;