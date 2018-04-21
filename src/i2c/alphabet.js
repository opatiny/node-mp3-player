// defining characters for ledDisplay: letters, numbers and space

'use strict';

var alphabet = {
  0: 0b11111100,
  1: 0b01100000,
  2: 0b11011010,
  3: 0b11110010,
  4: 0b01100110,
  5: 0b10110110,
  6: 0b10111110,
  7: 0b11100010,
  8: 0b11111110,
  9: 0b11110110,
  A: 0b11101110,
  B: 0b00111110,
  C: 0b00011010,
  D: 0b01111010,
  E: 0b10011110,
  F: 0b10001110,
  G: 0b10111100,
  H: 0b01101110,
  I: 0b00010011,
  J: 0b01110000,
  K: 0b01001111,
  L: 0b00011100,
  M: 0b00101011,
  N: 0b00101010,
  O: 0b00111010,
  P: 0b11001110,
  Q: 0b11100110,
  R: 0b11001111,
  S: 0b10110110,
  T: 0b00011110,
  U: 0b01111100,
  V: 0b00111000,
  W: 0b00111001,
  X: 0b00101001,
  Y: 0b01000111,
  Z: 0b11011010,
  '-': 0b00000010,
  ' ': 0b00000000,
};

// function inverting bits order (left to right instead of human reading direction)
function getCode(char) {
  let code = alphabet[char];
  let newCode = 0; // we invert the order of the bits
  for (let i = 0; i < 8; i++) {
    let isBitSet = (code & (1 << i)) >> i;
    newCode += isBitSet << (7 - i);
  }
  return newCode;
}

module.exports = {
  alphabet,
  getCode
};
