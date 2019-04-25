const { Suite } = require('benchmark');
const R = require('ramda');
const util = require('util');

const input = require('./input');

const suites = require('./suites');

const isInvalid = suites.reduce((res, s) => {
  const result = s.body(input);
  const isExpected = R.equals(result, input.expected);

  console.log(' - %s = %s', s.name, isExpected ? 'passed' : 'FAILED');

  if (!isExpected) {
    console.log(R.zip(input.expected, result));
  }

  return res.concat(isExpected);
}, []).some(x => !x);

if (isInvalid) {
  console.log('A suite failed to delivery, bailing out.')
  process.exit(0);
}

// suites.forEach(s => {
//   const result = s.body(input);

//   const isExpected = R.equals(result, input.expected);


// });

console.log();

const suite = new Suite();

suites.forEach(s => {
  suite.add(s.name, () => s.body(input));
});

suite
  .on('cycle', ev => {
    const b = ev.target;

    console.log(
      '%s op/s => %s',
      Math.trunc(b.hz).toLocaleString().padStart(14, ' '),
      b.name,
    );
  })
  .run({ async: true });

// const colorsInt = colors.map(x => parseInt(x, 16));

// const colorsHexStr = colors.map(x => `0x${x}`);

// suite
//   .add('bitwise', () => {
//     const r = colors.map(c => {
//       const x = parseInt(c, 16);
//       return [
//         (x & 0xff0000) >> 16,
//         (x & 0xff00) >> 8,
//         (x & 0xff),
//       ];
//     })
//   })
//   .add('bitwise (pre-parsed to int)', () => {
//     const r = colorsInt.map(c => {
//       return [
//         (c & 0xff0000) >> 16,
//         (c & 0xff00) >> 8,
//         (c & 0xff),
//       ]
//     })
//   })
//   .add('bitwise (implicit cast, prefixed with `0x`)', () => {
//     const r = colorsHexStr.map(c => [
//       (c & 0xff0000) >> 16,
//       (c & 0xff00) >> 8,
//       (c & 0xff),
//     ]);
//   })
//   .add('regex-map', () => {
//     const r = colors.map(c => {
//       return c.match(/../g).map(x => parseInt(x, 16));
//     })
//   })
//   .add('regex-map (implicit cast, prefixed with `0x`)', () => {
//     const r = colors.map(c => {
//       return c.match(/../g).map(x => +`0x${x}`);
//     })
//   })
//   .add('ramda-pipe', () => {
//     const r = R.pipe(
//       R.splitEvery(2),
//       R.map(x => parseInt(x, 16)),
//     )(colors);
//   })
//   .add('ramda-regex-map', () => {
//     R.map(R.pipe(
//       R.match(/../g),
//       x => parseInt(x, 16),
//     ))(colors);

//     const r = R.pipe(
//       R.match(/../g),
//       R.map(x => parseInt(x, 16)),
//     )
//   })
//   .add('destructure-arithmetic unholy mess', () => {
//     const r = colors.map(([r1, r2, g1, g2, b1, b2]) => [
//       (r1 * 16 + r2),
//       (g1 * 16 + g2),
//       (b1 * 16 + b2),
//     ])
//   })
//   .add('string-slice', () => {
//     const r = colors.map(c => [
//       parseInt(c.slice(0, 2), 16),
//       parseInt(c.slice(2, 4), 16),
//       parseInt(c.slice(4, 6), 16)
//     ]);
//   })
//   .add('string-slice binary (pre-parsed to int)', () => {
//     const r = colorsInt.map(c => [
//       parseInt(c.toString(2).slice(0, 8), 2),
//       parseInt(c.toString(2).slice(8, 16), 2),
//       parseInt(c.toString(2).slice(16), 2),
//     ]);
//   })
//   .add('string-slice binary (parse once to binary, pre-parsed to int)', () => {
//     const r = colorsInt.map(c => {
//       const b = c.toString(2);
//       const r = [
//         parseInt(b.slice(0, 8), 2),
//         parseInt(b.slice(8, 16), 2),
//         parseInt(b.slice(16), 2),
//       ];
//     })
//   })
