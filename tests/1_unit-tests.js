const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  test('Logic handles a valid puzzle string of 81 characters', function(){
    let str = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.equal(solver.validate(str), str);
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(){
    let invalidStr = 'A.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

    assert.equal(solver.validate(invalidStr).error, 'Invalid characters in puzzle')
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function(){
    let str = '....';
    
    assert.equal(solver.validate(str).error, 'Expected puzzle to be 81 characters long');
  });

  test('Logic handles a valid row placement', function(){
    let str = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 'A';
    let col = 1;
    let value = 3;
    assert.equal(solver.checkRowPlacement(str, row, col, value), true);
  });

  test('Logic handles an invalid row placement', function(){
    let str = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 'A';
    let col = 1;
    let value = 9;
    assert.equal(solver.checkRowPlacement(str, row, col, value), false);
  });

  test('Logic handles a valid column placement', function(){
    let str = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 'A';
    let col = 1;
    let value = 3;
    assert.equal(solver.checkColPlacement(str, row, col, value), true);
  });

  test('Logic handles an invalid column placement', function(){
    let str = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 'A';
    let col = 1;
    let value = 1;
    assert.equal(solver.checkColPlacement(str, row, col, value), false);
  });

  test('Logic handles a valid region (3x3 grid) placement', function(){
    let str = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let row = 'A';
    let col = 1;
    let value = 1;
    assert.equal(solver.checkRegionPlacement(str, row, col, value), true);
  });

  test('Logic handles an invalid region (3x3 grid) placement', function(){
    let str = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let row = 'A';
    let col = 2;
    let value = 2;
    assert.equal(solver.checkRegionPlacement(str, row, col, value), false);
  });

  test('Valid puzzle strings pass the solver', () => {
    let str = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    str = str.split('');
    let solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.equal(solver.solve(str).solution, solution);
  });

  test('Invalid puzzle strings fail the solver', () => {
    let invalidPuzzle = '..9115.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let str = invalidPuzzle.split('');
    assert.equal(solver.solve(str).error, "Puzzle cannot be solved");
  });

  test('Solver returns the the expected solution for an incomplete puzzzle', () => {
    let str = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    str = str.split('');
    let solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746'
    assert.equal(solver.solve(str).solution, solution);
  });

});
