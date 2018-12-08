const levenshtein = require('fast-levenshtein');

const strings = require('./input');

let dist1Strings = [];

function compareDistance(string) {
  strings.forEach(str => {
    if (levenshtein.get(string, str) === 1) {
      dist1Strings.push(string);
      dist1Strings.push(str);
    }
  });
}

while (strings.length) {
  compareDistance(strings.shift());
}

console.log(dist1Strings);
