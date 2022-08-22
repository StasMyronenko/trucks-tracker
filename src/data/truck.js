const TYPES = ['SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT'];

const SIZE = {
  SPRINTER: {
    weight: 1700,
    width: 300,
    length: 250,
    height: 170,
  },
  'SMALL STRAIGHT': {
    weight: 2500,
    width: 500,
    length: 250,
    height: 170,
  },
  'LARGE STRAIGHT': {
    weight: 4000,
    width: 700,
    length: 350,
    height: 200,
  },
};

const STATUS = ['OL', 'IS'];

module.exports = {
  TYPES,
  STATUS,
  SIZE,
};
