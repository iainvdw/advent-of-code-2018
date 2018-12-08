const benchmark = (fn, times) => {
  const time = process.hrtime();
  for (let i = 0; i < times; i++) {
    fn();
  }
  const duration = process.hrtime(time);
  return `${duration[0]}.${duration[1]}s`;
};

module.exports = {
  benchmark,
};
