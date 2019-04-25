const J = require('jsverify');
const R = require('ramda');

const { rgbToHex } = require('./helpers');

const testFunction = (name, fn) => {
  J.check(
    J.forall(
      J.tuple([J.uint8, J.uint8, J.uint8]),
      rgb => {
        const hexRgb = rgbToHex(rgb);
        return R.equals(rgb, fn(hexRgb));
      }
    )
  );
};

module.exports = testFunction;
