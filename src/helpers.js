const numToHex = x => x.toString(16).padStart(2, '0');
const rgbToHex = rgb => rgb.map(numToHex).join('');

module.exports = {
  numToHex,
  rgbToHex,
};
