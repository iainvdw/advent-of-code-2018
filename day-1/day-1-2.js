const inputFreqs = require('./input');
const { benchmark } = require('../utils/benchmark');

console.log(benchmark(searchFreq, 1000));

function searchFreq() {
  const freqs = {};
  let endFreq = 0;
  let loops = 0;
  let double = null;

  const loopList = start => {
    let currentFreq = start;

    for (const freq of inputFreqs) {
      currentFreq = currentFreq + freq;

      if (loops > 0 && freqs[currentFreq] === currentFreq) {
        double = currentFreq;
        break;
      }

      freqs[currentFreq] = currentFreq;
    }

    return currentFreq;
  };

  while (double === null) {
    endFreq = loopList(endFreq);
    loops = loops + 1;
  }
}
