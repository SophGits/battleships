function pickRandom(num) {
  if(num) {
    return Math.floor(Math.random() * num + 1)
  } else {
    return Math.random();
  }
}
module.exports = {
  pickRandom: pickRandom
}