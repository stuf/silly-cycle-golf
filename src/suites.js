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
    name: 'regex-map',
    body: input => input
      .match(/../g)
      .map(x => parseInt(x, 16)),
  },
];

