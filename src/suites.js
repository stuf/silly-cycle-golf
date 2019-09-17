const R = require('ramda');

module.exports = [
  {
    name: 'bitwise',
    body: input => {
      const c = parseInt(input, 16);
      return [
        (c & 0xff0000) >> 16,
        (c & 0xff00) >> 8,
        (c & 0xff),
      ];
    },
  },
  {
    name: 'destructure',
    body: input => {
      const [r1, r2, g1, g2, b1, b2] = input;
      return [
        parseInt(`${r1}${r2}`, 16),
        parseInt(`${g1}${g2}`, 16),
        parseInt(`${b1}${b2}`, 16),
      ]
    },
  },
  {
    name: 'ramda split-parse',
    body: R.pipe(
      R.splitEvery(2),
      R.map(x => parseInt(x, 16)),
    ),
  },
  {
    name: 'regex-map',
    body: input => input
      .match(/../g)
      .map(x => parseInt(x, 16)),
  },
];

