function run2() {
  // Strat 2 - 4s strings, 20s parseInt
  const fabric = (('0'.repeat(1000) + 'x').repeat(999) + '0'.repeat(1000))
    .split(/x/g)
    .map(el => el.split('').map(parseInt));

  return fabric;
}

function run3() {
  // Strat 3 - 14s
  const fabric = [
    ...new Array(1000).fill(0, 0, 999).map(_ => [...new Array(1000).fill(0, 0, 999)]),
  ];
  const makeClaim = ([id, x, y, w, h]) => {};
  claims.forEach(makeClaim);

  return fabric;
}
