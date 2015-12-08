function Player(grid) {
  this.grid = grid;
  this.guesses = 0;
  display(grid);
}

Player.prototype.guess = function(input, promptText, finished) {
  input = input.toUpperCase();

  console.log('\033[2J'); // Clears the screen

  try {
    switch(this.grid.get(input)) {
      case 0:
        console.log('Splash. Hit nothing...');
        this.grid.set(input, 'MISS');
        this.guesses += 1;
        break;
      case 1:
        this.grid.set(input, 'HIT');
        this.guesses += 1;
        this.checkForSunkVessels(1);
        break;
      case 2:
        this.grid.set(input, 'HIT');
        this.guesses += 1;
        this.checkForSunkVessels(2);
        break;
      case 3:
        this.grid.set(input, 'HIT');
        this.guesses += 1;
        this.checkForSunkVessels(3);
        break;
      case 'HIT':
        console.log('Guessed that already.');
        break;
      case 'MISS':
        console.log('Guessed that already...there was nothing there.');
        break;
    }
  } catch(e) {
    console.log(e.message + '. Guess again...');
  }

  var hitCount = this.grid.coordinates().filter(function(key) {
    return this.grid.squares[key] === 'HIT';
  }.bind(this)).length;

  if(hitCount >= 13) {
    displayEndGameGrid(this.grid.squares);
    finished(this.guesses);
  } else {
    display(this.grid);
    promptText('\nGuess again: ');
  }
};

Player.prototype.checkForSunkVessels = function(val) {
  var blast = String.fromCharCode(0xD83D, 0xDCA5);

  var remaining = this.grid.coordinates().filter(function(key) {
    return this.grid.squares[key] === val;
  }.bind(this)).length;

  if(remaining === 0) {
    console.log(blast+blast+blast+ '  Vessel down! ' + blast+blast+blast);
    return true;
  }
  console.log(blast + '  Hit vessel ' + blast);
  return false;
}

function display(grid) {
  var display = [];
  grid.coordinates().map(function(key, i) {
    var icon;

    if(grid.get(key) === 'HIT') {
      icon = String.fromCharCode(0xD83D, 0xDCA5);
    } else if(grid.get(key) === 'MISS') {
      icon = String.fromCharCode(0xD83D, 0xDCA6); // drops
    } else {
      icon = key + ' ';
    }

    if(i%10 === 0) { display.push("\n"); }
    var length = icon.length;
    switch(length) {
      case 1:
        icon += '    ';
        break;
      case 2:
        icon += '   ';
        break;
      case 3:
        icon += ' ';
        break;
    }
    display.push(icon);
  }.bind(this));
  console.log(display.join(''));

  return true;
}

function displayEndGameGrid(grid) {
  var endMessage = grid,
      endGameValues = ['G','A','M','E','O','V','R'],
      emoji = String.fromCharCode(0xD83D, 0xDCA7); // droplet

  Object.keys(endMessage).forEach(function(key) {
    endMessage[key] = ' ' + emoji + ' ';
  }.bind(this));

  ['B4','B5','B6','B7','C3','C4','C5','C6','C7','C8','E4','E5','E6','E7','F4','F5','F6','F7','D3','E3','F3','G3','D8','E8','F8','G8','D2','E2','F2','G2','D9','E9','F9','G9','H3','H8','H4','H5','H6','H7','I4','I5','I6','I7'].forEach(function(key) {
    endMessage[key] = '   ';
  })

  endMessage['D4'] = ' G ';
  endMessage['D5'] = ' A ';
  endMessage['D6'] = ' M ';
  endMessage['D7'] = ' E ';

  endMessage['G4'] = ' O ';
  endMessage['G5'] = ' V ';
  endMessage['G6'] = ' E ';
  endMessage['G7'] = ' R ';

  var display = Object.keys(endMessage).reduce(function(ret, val, i) {
    if(i%10 === 0) { ret.push("\n"); }
    ret.push(endMessage[val]);
    return ret;
  }, []);

  console.log(display.join(''));
}

module.exports = Player;