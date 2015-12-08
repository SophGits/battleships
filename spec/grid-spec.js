var Grid = require('../game/grid');

describe('Grid', function() {
  var grid;

  beforeEach(function() {
    grid = new Grid(3);
  });

  describe('get', function() {
    it('returns 0 by default', function() {
      expect(grid.get('C3')).toEqual(0);
    });

    it('throws an error for an invalid coordinate', function() {
      expect(function() {
        grid.get('foo');
      }).toThrow();
    })

    it('throws an error for an out-of-grid coordinate', function() {
      expect(function() {
        grid.get('D4');
      }).toThrow();
    });
  });

  describe('coordinates', function() {
    it('returns grid coordinates, in row order', function() {
      expect(grid.coordinates()).toEqual([
        'A1', 'A2', 'A3',
        'B1', 'B2', 'B3',
        'C1', 'C2', 'C3'
      ]);
    });
  });
});