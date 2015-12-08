var Grid = require('./game/grid'),
    Strategist = require('./game/strategist'),
    Player = require('./game/player');

var grid = new Grid(),
    strategist = new Strategist(grid),
    player = new Player(grid),
    stdout = process.stdout,
    stdin = process.openStdin();

strategist.placeVessels();

var introductionText = '\nBATTLESHIPS\n\nEnter a position on the Battleships grid between A1 and J10.\nIt is case insensitive.\n';
console.log(introductionText);

// Get user input
stdin.addListener('data', function(input) {
  input = input.toString().trim();
  player.guess(input, prompt, endGame);
});

function prompt(text) {
  stdout.write(text);
}

function endGame(guesses) {
  console.log('Game over. It took you ' + guesses + ' guesses.');
  process.stdin.unref(); // when finished
}


