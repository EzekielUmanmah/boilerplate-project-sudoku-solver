
class SudokuSolver {

  validate(puzzleString) {

    if(puzzleString.length != 81) return { error: 'Expected puzzle to be 81 characters long' }

    let invalidCharacter = puzzleString.split('').filter(x => {
        if(!/[\.]|[\d]/.test(x)) return x
      });
    if(invalidCharacter[0] || !puzzleString){
      return { error: 'Invalid characters in puzzle' }
    }
    //else {
      return puzzleString
    //}

  }

  checkRowPlacement(puzzleString, row, column, value) {

    let coordinates = [];
    let rowLetter;
    let colNum;
    let temp = [];
    if(row){row = row.toUpperCase();}
    for(let i = 0; i < puzzleString.length; i++){
      rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      colNum = (i % 9) + 1;
      coordinates.push(rowLetter + colNum);
    } 
    for(let i = 0; i < coordinates.length; i++){
        if(coordinates[i][0] == row){
            temp.push(puzzleString[i]);
        }
    } 
    temp = temp.join('');
    return !temp.includes(value) ? true : false
    
  }

  checkColPlacement(puzzleString, row, column, value) {
    let coordinates = [];
    let rowLetter;
    let colNum;
    let temp = [];
    if(row){row = row.toUpperCase();}
    for(let i = 0; i < puzzleString.length; i++){
      rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      colNum = (i % 9) + 1;
      coordinates.push(rowLetter + colNum);
    } 
    for(let i = 0; i < coordinates.length; i++){
        if(coordinates[i][1] == column){
            temp.push(puzzleString[i]);
        }
    } 
    temp = temp.join('');
    return !temp.includes(value) ? true : false
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let coordinates = [];
    let rowLetter;
    let colNum;
    let regions = [];
    if(row) row = row.toUpperCase();

    for(let i = 0; i < puzzleString.length; i++){
      rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      colNum = (i % 9) + 1;
      coordinates.push(rowLetter + colNum);
    }

    for(let i = 0; i < coordinates.length; i+=27){
      for(let k = 0; k < 9; k+=3){
        regions.push(
          coordinates.slice(i+k,i+k+3) + ',' +
          coordinates.slice(i+k+9, i+k+12) + ',' +
          coordinates.slice(i+k+18, i+k+21)
        )
      }
    }

    let region = regions.filter(x => x.includes(row + column))[0].split(',').map(x => puzzleString[coordinates.indexOf(x)]).join('');

    return region.includes(value) ? false : true;
  }

  /*solve(puzzleString) {

    let num = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    puzzleString = puzzleString.split('');
    let rowLetter;
    let colNum;
    let coordinates = [];
    let changed = []; let dots = []; let lastValidInput;
let i; let k; let dot; let length = puzzleString.length; let flag;

    for(i = 0; i < length; i++){
console.log(i)
      rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      colNum = (i % 9) + 1;
      coordinates.push(rowLetter + colNum);
//if(puzzleString[i] == '.'){
      for(k = 0; k < num.length; k++){ 
        if(puzzleString[i] == '.' || puzzleString[i] == ''){ 
          let row = coordinates[i][0];
          let column = coordinates[i][1];
          let value = num[k]; 
          
          if(this.checkRowPlacement(puzzleString, row, column, value)&&this.checkColPlacement(puzzleString, row, column, value)&&this.checkRegionPlacement(puzzleString, row, column, value)){
            puzzleString[i] = num[k]; 
            changed.push(row + column)
          } 
          
        } //end statement
        
      } //end inner loop 
      
        while(puzzleString[i] == '.') {
          
          //console.log(coordinates.indexOf(changed[changed.length-1]), puzzleString[coordinates.indexOf(changed[changed.length-1])])
          //console.log(i,puzzleString[i])
          i = coordinates.indexOf(changed[changed.length-2]) //- 1
          length = length - i - 2; 
          puzzleString[i] = ''
          //console.log(i,puzzleString[i])
          changed.pop();
          //console.log(changed)
          //iterate through num, starting from puzzleString[i] val to end
          //all blanks need to be changed back to blanks
          continue; 
        } 
        
    }//end outer loop 
  //console.log(puzzleString.join(''))
  }//end this.solve()*/

  findEmpty(puzzleString){
    for(let i = 0; i < puzzleString.length; i++){
      if(puzzleString[i] == '.'){
        let row = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
        let col = (i % 9) + 1;
        return [row, col, i];
      }
    } 
    return false;
  }

  checkValue(puzzleString, row, column, value){
    if(this.checkRowPlacement(puzzleString, row, column, value)&&
    this.checkColPlacement(puzzleString, row, column, value)&&
    this.checkRegionPlacement(puzzleString, row, column, value)){
      return true;
    }
    return false;
  }

  /*solve(puzzleString) {
    let row = this.findEmpty(puzzleString)[0];
    let col = this.findEmpty(puzzleString)[1];
    let i = this.findEmpty(puzzleString)[2];

    if(!row) return puzzleString
//console.log('CURRENT GRID: ', i, puzzleString[i])
    for(let num = 1; num < 10; num++){
      //console.log('1st in Loop: ', i, puzzleString[i])
      if(this.checkValue(puzzleString, row, col, num)){
        puzzleString[i] = num;
        //console.log('checkValue 1: ',i, puzzleString[i])
        this.solve(puzzleString)
      } else {
        //console.log('checkValue 2: ',i, puzzleString[i])
      }
    }
    //console.log('between: ', i, puzzleString[i], puzzleString[i-1])
    if(this.findEmpty(puzzleString)){ 
      //console.log('findEmpty 1: ', i, puzzleString[i], puzzleString[i-1])
      puzzleString[i] = '.';
      //console.log('findEmpty 2: ', i, puzzleString[i], puzzleString[i-1])
    } 
    //return false;
    if(puzzleString.includes('.')) return { error: 'Puzzle cannot be solved' } 
    
    return {
      solution: puzzleString.join('')
      }

  }//end this.solve()*/
  solve(puzzleString) { 
    // Only call findEmpty once!
    let emptyCell = this.findEmpty(puzzleString); 
    if (!emptyCell) {
      //console.log(puzzleString.join(''))
      return { solution: puzzleString.join('') };
    } // return the success object
    let [row, col, i] = emptyCell; // use destructuring assignment
    console.log('OUTSIDE',i,puzzleString[i])
    for (let num = 1; num < 10; num++) { console.log('INSIDE',i,num)
        if (this.checkValue(puzzleString, row, col, num)) {
          //console.log('0',i,puzzleString[i])
            puzzleString[i] = num;
            console.log('1',i,puzzleString[i])
            let result = this.solve(puzzleString); // capture the return value
            if(result) console.log(i,puzzleString[i],result,num)
            //console.log(i,result,puzzleString[i])
            if (result.solution) return result; // success: fast backtracking!
            //if (puzzleString[i] != ".") {
              //console.log('2',i,puzzleString[i])
              //puzzleString[i] = "."
              console.log('3',i,puzzleString[i],num)
            //}
        }
    } 
    //console.log(i, puzzleString[i], puzzleString.slice(0, i).join(''))
    puzzleString[i] = "."; // could not solve this spot
    // backtrack to possibly take a different route in previous decisions
    return { error: 'Puzzle cannot be solved' };
    //return false
  }

}



module.exports = SudokuSolver;
