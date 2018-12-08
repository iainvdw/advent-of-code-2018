const fs = require('fs');
const { benchmark } = require('../utils/benchmark');
const claims = require('./input');

const size = [...new Array(1000).fill(0)];
// const size = [...Array.from({ length: 1000 }, x => 0)];

function generateFabric() {
  // Strat 1 - 0.8s
  // const fabric = size.map(x => [...size]);
  const fabric = size.map(x => size.slice());

  return fabric;
}

// function run2() {
//   // Strat 2 - 4s strings, 20s parseInt
//   const fabric = (('0'.repeat(1000) + 'x').repeat(999) + '0'.repeat(1000))
//     .split(/x/g)
//     .map(el => el.split('').map(parseInt));

//   return fabric;
// }

// function run3() {
//   // Strat 3 - 14s
//   const fabric = [
//     ...new Array(1000).fill(0, 0, 999).map(_ => [...new Array(1000).fill(0, 0, 999)]),
//   ];
//   const makeClaim = ([id, x, y, w, h]) => {};
//   claims.forEach(makeClaim);

//   return fabric;
// }

// console.log(benchmark(run, 1000));

const SINGLE_CLAIM = 1;
const DOUBLE_CLAIM = 2;

const calcClaims = (fabric, cls) => {
  cls.forEach(([id, x, y, w, h]) => {
    for (let yCoord = y; yCoord < y + h; yCoord++) {
      for (let xCoord = x; xCoord < x + w; xCoord++) {
        const cellValue = fabric[yCoord][xCoord];

        if (cellValue === DOUBLE_CLAIM) {
          continue;
        }

        fabric[yCoord][xCoord] = cellValue === 0 ? SINGLE_CLAIM : DOUBLE_CLAIM;
      }
    }
  });

  return fabric;
};

const calcDoubleClaims = claimedFabric =>
  claimedFabric.reduce(
    (prev, row) => prev + row.reduce((prev, el) => prev + (el === DOUBLE_CLAIM ? 1 : 0), 0),
    0
  );

const runChallenge = () => {
  const claimedFabric = calcClaims(generateFabric(), claims);
  calcDoubleClaims(claimedFabric);

  fs.writeFileSync(__dirname + '/map.txt', claimedFabric.map(row => row.join('')).join('\n'));
};

runChallenge();
