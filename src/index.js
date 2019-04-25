const { Suite } = require('benchmark');
const J = require('jsverify');
const util = require('util');

const suites = require('./suites');
const testFn = require('./validate');
const { rgbToHex } = require('./helpers');

// Verify given suites actually work (I guess)

suites.forEach(s => {
  process.stdout.write(util.format('Verifying `%s`: ', s.name));
  testFn(s.name, s.body);
});

// Generate test data

const items = Array(32)
  .fill(0)
  .map(J.tuple([J.uint8, J.uint8, J.uint8]).generator)
  .map(rgbToHex);

// Benchmark suites

const suite = new Suite();

suites.forEach(s => {
  suite.add(s.name, () => items.map(s.body));
});

suite.on('cycle', ev => {
  const b = ev.target;

  console.log(
    '%s op/s => %s',
    Math.trunc(b.hz).toLocaleString().padStart(14, ' '),
    b.name,
  );
});

suite.run({ async: true });
