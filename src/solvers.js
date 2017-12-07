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
  var solutionCount = undefined; //fixme
  var boardArray = [];
  var initSubsetArray = initSubsetArray(n);
  // structure of subSetArray is [row][column][tuple coord (0 or 1)]
  var initSubSetArray = function(n) {
    var subSetArray = [];
    for(var rowIdx = 0; rowIdx < n; rowIdx++) {
      var rowOfTuples = [];
      for(var colIdx = 0; colIdx < n; colIdx++) {
        rowOfTuples.push([rowIdx,colIdx]);
      }
      subSetArray.push(rowOfTuples);
    }
    return subSetArray;
  }
  var tmpBoard = new Board({'n':n});
  recurse(initSubsetArray);

  var recurse = function(subSetArray) {
    if(subSetArray.length === 1) {
      var newBoard = new Board({'n':n});
      newBoard.attributes = tmpBoard.copyAttributes();
      newBoard.togglePiece(subSetArray[0][0][0],subSetArray[0][0][1]);
      boardArray.push(newBoard);
      return;
    }
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
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
