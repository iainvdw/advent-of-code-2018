const { benchmark } = require('../utils/benchmark');
const strings = require('./input');

const makeFilter = chr => el => el === chr;

console.log(benchmark(run, 1000));

function run() {
  const matches = {
    two: 0,
    three: 0,
  };

  strings.forEach(string => {
    let matchesTwo = false;
    let matchesThree = false;

    const splitString = [...string];
    const uChars = new Set(splitString);

    uChars.forEach(c => {
      const charFilter = makeFilter(c);
      const numberSameChars = splitString.filter(charFilter).length;

      if (numberSameChars === 2) {
        matchesTwo = true;
      }

      if (numberSameChars === 3) {
        matchesThree = true;
      }
    });

    if (matchesTwo) {
      matches.two += 1;
    }

    if (matchesThree) {
      matches.three += 1;
    }
  });

  const { two, three } = matches;
}
