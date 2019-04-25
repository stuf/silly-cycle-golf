const { Suite } = require('benchmark');
const R = require('ramda');
const util = require('util');

const suite = new Suite();

const colors = `be4a2f
d77643
ead4aa
e4a672
b86f50
733e39
3e2731
a22633
e43b44
f77622
feae34
fee761
63c74d
3e8948
265c42
193c3e
124e89
0099db
2ce8f5
ffffff
c0cbdc
8b9bb4
5a6988
3a4466
262b44
181425
ff0044
68386c
b55088
f6757a
e8b796
c28569`.split('\n');

const colorsInt = colors.map(x => parseInt(x, 16));

const colorsHexStr = colors.map(x => `0x${x}`);

suite
  .add('bitwise', () => {
    const r = colors.map(c => {
      const x = parseInt(c, 16);
      return [
        (x & 0xff0000) >> 16,
        (x & 0xff00) >> 8,
        (x & 0xff),
      ];
    })
  })
  .add('bitwise (pre-parsed to int)', () => {
    const r = colorsInt.map(c => {
      return [
        (c & 0xff0000) >> 16,
        (c & 0xff00) >> 8,
        (c & 0xff),
      ]
    })
  })
  .add('bitwise (implicit cast, prefixed with `0x`)', () => {
    const r = colorsHexStr.map(c => [
      (c & 0xff0000) >> 16,
      (c & 0xff00) >> 8,
      (c & 0xff),
    ]);
  })
  .add('regex-map', () => {
    const r = colors.map(c => {
      return c.match(/../g).map(x => parseInt(x, 16));
    })
  })
  .add('regex-map (implicit cast, prefixed with `0x`)', () => {
    const r = colors.map(c => {
      return c.match(/../g).map(x => +`0x${x}`);
    })
  })
  .add('ramda-pipe', () => {
    const r = R.pipe(
      R.splitEvery(2),
      R.map(x => parseInt(x, 16)),
    )(colors);
  })
  .add('ramda-regex-map', () => {
    const r = R.pipe(
      R.match(/../g),
      R.map(x => parseInt(x, 16)),
    )
  })
  .add('destructure-arithmetic unholy mess', () => {
    const r = colors.map(([r1, r2, g1, g2, b1, b2]) => [
      (r1 * 16 + r2),
      (g1 * 16 + g2),
      (b1 * 16 + b2),
    ])
  })
  .add('string-slice', () => {
    const r = colors.map(c => [
      parseInt(c.slice(0, 2), 16),
      parseInt(c.slice(2, 4), 16),
      parseInt(c.slice(4, 6), 16)
    ]);
  })
  .add('string-slice binary (pre-parsed to int)', () => {
    const r = colorsInt.map(c => [
      parseInt(c.toString(2).slice(0, 8), 2),
      parseInt(c.toString(2).slice(8, 16), 2),
      parseInt(c.toString(2).slice(16), 2),
    ]);
  })
  .add('string-slice binary (parse once to binary, pre-parsed to int)', () => {
    const r = colorsInt.map(c => {
      const b = c.toString(2);
      const r = [
        parseInt(b.slice(0, 8), 2),
        parseInt(b.slice(8, 16), 2),
        parseInt(b.slice(16), 2),
      ];
    })
  })
  .on('cycle', ev => {
    const b = ev.target;

    console.log(
      '%s op/s => %s',
      Math.trunc(b.hz).toLocaleString().padStart(14, ' '),
      b.name,
    );
  })
  .run({ async: true });