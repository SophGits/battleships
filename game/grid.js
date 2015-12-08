var Strategist = require('./strategist');

function Grid(size) {
  this.size = size || 10; // 10 is a 10x10 grid (100 squares)
  this.squares = makeSquares(this.size);
}

function makeSquares(size) {
  var squares = {};

  for (var j = 0; j < size; j++) {
    for (var k = 0; k < size; k++) {
      var row = String.fromCharCode(65 + j),
          col = k + 1;

      squares[row + col] = 0; // Empty
    }
  }

  return squares;
}

Grid.prototype.get = function(coordinate) {
  if (!this.squares.hasOwnProperty(coordinate)) {
    throw new Error('Invalid coordinate: ' + coordinate);
  }

  return this.squares[coordinate];
}

Grid.prototype.set = function(coordinate, status) {
  if (!this.squares.hasOwnProperty(coordinate)) {
    throw new Error('Invalid coordinate: ' + coordinate);
  }

  this.squares[coordinate] = status;
  return;
}

Grid.prototype.coordinates = function() {
  return Object.keys(this.squares);
};

Grid.prototype.setUpVessel = function(vessel, vesselNum) {
  // console.log(vessel);

  vessel.forEach(function(location) {
    this.squares[location] = vesselNum + 1;
  }.bind(this));
};

module.exports = Grid;