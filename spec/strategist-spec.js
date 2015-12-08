var Grid = require('../game/grid'),
    Strategist = require('../game/strategist'),
    Helper = require('../game/helper');

describe('Strategist', function() {
  var grid, strategist;

  beforeEach(function() {
    grid = new Grid(10);
    strategist = new Strategist(grid);
  });

  it('places vessels horizontally', function() {
    strategist.placeVessel(44, 0, 4, 0);
    expect(grid.get('E5')).toEqual(1);
    expect(grid.get('E6')).toEqual(1);
    expect(grid.get('E7')).toEqual(1);
    expect(grid.get('E8')).toEqual(1);
  });

  it('places vessels vertically', function() {
    strategist.placeVessel(11, 1, 4, 2);
    expect(grid.get('B2')).toEqual(3);
    expect(grid.get('C2')).toEqual(3);
    expect(grid.get('D2')).toEqual(3);
    expect(grid.get('E2')).toEqual(3);
    expect(grid.get('F2')).toEqual(0);
  });

  it('refuses to fill squares that will cause vessel overlap', function() {
    // I1, I2, I3, I4
    strategist.placeVessel(80, 0, 4, 0);
    // G3, H3, I3, J3
    strategist.placeVessel(62, 1, 4, 1);
    expect(grid.get('I3')).toEqual(1);
    expect(grid.get('J3')).toEqual(0);
  });

  it('will not place vessels where there is insufficient room', function() {
    // C7, C8, C9, C10, undefined
    strategist.placeVessel(35, 1, 5, 0);
    expect(grid.get('C7')).toEqual(0);

    // H9, I9, J9, undefined
    strategist.placeVessel(78, 0, 4, 0);
    expect(grid.get('H9')).toEqual(0);
  });

  it('returns number of coordinate sets equal to number of vessels', function() {
    strategist.placeVessels();
    expect(strategist.placedVessels.length).toEqual(strategist.vessels.length);
  })
});