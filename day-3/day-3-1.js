const fs = require('fs');
const { benchmark } = require('../utils/benchmark');
const claims = require('./input');

// Pregenerate empty row filled with zeroes.
// Apply destructuring to convert to PACKED_SMI_ELEMENTS array [1].
// [1] https://v8.dev/blog/elements-kinds
const row = [...new Array(1000).fill(0)];

// Copy row 1000 times into 2-dimensional array
function generateFabric() {
  // Strat 1 - 0.8s
  // const fabric = size.map(x => [...size]);
  const fabric = row.map(x => row.slice());

  return fabric;
}

const SINGLE_CLAIM = 1;
const DOUBLE_CLAIM = 2;

const calcClaims = (fabric, cls) => {
  // Get claims
  cls.forEach(([id, x, y, w, h]) => {
    // Loop rows
    for (let yCoord = y; yCoord < y + h; yCoord++) {
      // Loop entries
      for (let xCoord = x; xCoord < x + w; xCoord++) {
        const cellValue = fabric[yCoord][xCoord];

        // Skip if cell already has a double claim
        if (cellValue === DOUBLE_CLAIM) {
          continue;
        }

        // Check if cell has no claim, then single claim, otherwise double claim
        fabric[yCoord][xCoord] = cellValue === 0 ? SINGLE_CLAIM : DOUBLE_CLAIM;
      }
    }
  });

  return fabric;
};

const calcDoubleClaims = claimedFabric =>
  // Count all double claims in each row, add them together
  claimedFabric.reduce(
    (prev, row) => prev + row.reduce((prev, el) => prev + (el === DOUBLE_CLAIM ? 1 : 0), 0),
    0
  );

const runChallenge = () => {
  const claimedFabric = calcClaims(generateFabric(), claims);
  console.log(calcDoubleClaims(claimedFabric));

  return claimedFabric;
};

console.log(benchmark(runChallenge, 1000));

fs.writeFileSync(
  __dirname + '/map.txt',
  runChallenge()
    .map(row => row.join(''))
    .join('\n')
);
