'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => { 
      const puzzleString = req.body.puzzle;
      const coordinate = req.body.coordinate;
      const value = req.body.value;

      /*let invalidCharacter = puzzleString.split('').filter(x => {
        if(!/[\.]|[\d]/.test(x)) return x
      });
      if(invalidCharacter[0]){
        return res.json({ error: 'Invalid characters in puzzle' })
      }

      if(puzzleString.length != 81){
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }*/
      if(solver.validate(puzzleString).error){
        let msg = solver.validate(puzzleString).error;
        return res.json({error: msg})
      }

      if(!puzzleString || !value || !coordinate){
        return res.json({error: 'Required field(s) missing'})
      }

      let rowLetter;
      let colNum;
      let coordinates = [];
      for(let i = 0; i < puzzleString.length; i++){
        rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
        colNum = (i % 9) + 1;
        coordinates.push(rowLetter + colNum);
      } 
      if(!coordinates.includes(coordinate[0].toUpperCase() + coordinate[1])||coordinate.length !=2){
        return res.json({error: 'Invalid coordinate'})
      }

      if(!/[0-9]/.test(value) || value < 1 || value > 9){
        return res.json({ error: 'Invalid value' })
      }
      
      let checkRow = solver.checkRowPlacement(puzzleString, coordinate[0], coordinate[1], value);
      let checkCol = solver.checkColPlacement(puzzleString, coordinate[0], coordinate[1], value);
      let checkRegion = solver.checkRegionPlacement(puzzleString, coordinate[0], coordinate[1], value);

      let response;
      let conflict = [];
      if(checkRow && checkCol && checkRegion){
        response = {valid: true}
      }
      else{
        if(!checkRow){conflict.push('row')}
        if(!checkCol){conflict.push('column')}
        if(!checkRegion){conflict.push('region')}
        response = {valid: false, conflict}
      }

      res.json(response)

    });
    
  app.route('/api/solve')
    .post((req, res) => { 
      const puzzleString = req.body.puzzle;

      if(!puzzleString) return res.json({ error: 'Required field missing' });

      if(solver.validate(puzzleString).error){
        let msg = solver.validate(puzzleString).error;
        return res.json({error: msg})
      }

      /*let invalidCharacter = puzzleString.split('').filter(x => {
        if(!/[\.]|[\d]/.test(x)) return x
      });
      if(invalidCharacter[0]){
        return res.json({ error: 'Invalid characters in puzzle' })
      }*/

      //if(puzzleString.length != 81) return res.json({ error: 'Expected puzzle to be 81 characters long' })

      let str = puzzleString.split('')
      res.json(solver.solve(str))
    });
};
