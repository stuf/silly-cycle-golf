const R = require('ramda');

module.exports = [
  {
    name: 'bitwise',
    body: ({ raw, input }) => input.map(c => {
      const x = parseInt(c, 16);
      return [
        (x & 0xff0000) >> 16,
        (x & 0xff00) >> 8,
        (x & 0xff),
      ];
    }),
  },
  {
    name: 'bitwise (pre-parsed as int)',
    body: ({ raw, inputInt: input }) => input.map(c => [
      (c & 0xff0000) >> 16,
      (c & 0xff00) >> 8,
      (c & 0xff),
    ]),
  },
];

