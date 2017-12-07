/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // structure of subSetArray is [row][column][tuple coord (0 or 1)]
  var initSubsetArray = function(n) {
    var subsetArray = [];
    for(var rowIdx = 0; rowIdx < n; rowIdx++) {
      var rowOfTuples = [];
      for(var colIdx = 0; colIdx < n; colIdx++) {
        rowOfTuples.push([rowIdx,colIdx]);
      }
      subsetArray.push(rowOfTuples);
    }
    return subsetArray;
  };
  var callCount = 0;
  var recurse = function(initSubsetArray) {
    // if(callCount++ > 10) {
    //   throw 'called too many times';
    // }
    if(n>1) console.log('call recurse');
    if(initSubsetArray.length === 1) {
      if(n>1) console.log('entering base case');
      var newBoard = new Board(tmpBoard.rows());
      newBoard.togglePiece(initSubsetArray[0][0][0],initSubsetArray[0][0][1]);
      console.log('newBoard:',newBoard);
    //  if(n>1) debugger;
      boardArray.push(newBoard);
      console.log('returning from base case');
      return;
    }
    if(n>1)  console.log('initSubsetArray[0]',initSubsetArray[0]);
    for(var col = 0; col < initSubsetArray[0].length; col++) {
      var subsetArray = [];
      var rookIndex = [initSubsetArray[0][col][0],initSubsetArray[0][col][1]];
      if(n>1) console.log('rookIndex:',rookIndex);
      // toggle piece on
      tmpBoard.togglePiece(...rookIndex);
      for(var row = 1; row < initSubsetArray.length; row++) {
        if(n>1) console.log('row,col:',row,',',col,'initSubsetArray[row]:',initSubsetArray[row]);
        subsetArray.push(initSubsetArray[row].slice(0,col).concat(initSubsetArray[row].slice(col+1)));
      }
      if(n>1) console.log('pre-recurse subsetArray:',subsetArray);
      recurse(subsetArray);
      // toggle piece back off again before iterating to the next col
      tmpBoard.togglePiece(...rookIndex);
    }

  };
  var solutionCount = undefined; //fixme
  var boardArray = [];
  var subsetArray = initSubsetArray(n);
  var tmpBoard = new Board({n:n});
  recurse(subsetArray);

  solutionCount = boardArray.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  if(n>1) console.log('boardArray:', boardArray);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
