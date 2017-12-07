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
  let solution = this.getAllRookSolutions(n, 1)[0];
  console.log(solution);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.getAllRookSolutions = function(n, solutionLimit) {
  var callCount = 0;
  solutionLimit = solutionLimit === undefined ? Number.POSITIVE_INFINITY : solutionLimit;
  // structure of subSetArray is [row][column][tuple coord (0 or 1)]
  var initSubsetArray = function(n) {
    var subsetArray = [];
    for (var rowIdx = 0; rowIdx < n; rowIdx++) {
      var rowOfTuples = [];
      for (var colIdx = 0; colIdx < n; colIdx++) {
        rowOfTuples.push([rowIdx, colIdx]);
      }
      subsetArray.push(rowOfTuples);
    }
    callCount++;
    return subsetArray;
  };
  var toggle = function(array, row, column) {
    array[row][column] = array[row][column] ? 0 : 1;
  };
  var recurse = function(initSubsetArray) {
    if (initSubsetArray.length === 0) {
      return;
    }
    if (initSubsetArray.length === 1) {
      //var newBoard = new Board(tmpBoard.rows());
      var newBoard = [];
      for (var row = 0; row < tmpBoard.length; row++) {
        newBoard.push(tmpBoard[row].slice());
      }
      //console.log('initSubsetArray[0][0][0]:',initSubsetArray[0][0][0],'initSubsetArray[0][0][1]:',initSubsetArray[0][0][1]);
      //newBoard.togglePiece(initSubsetArray[0][0][0], initSubsetArray[0][0][1]);
      toggle(newBoard, initSubsetArray[0][0][0], initSubsetArray[0][0][1]);
      //console.log(newBoard);
      boardArray.push(newBoard);
      // console.log(newBoard.rows());
      //callCount++;
      return;
    }
    for (var col = 0; col < initSubsetArray[0].length; col++) {
      var subsetArray = [];
      var rookIndex = [initSubsetArray[0][col][0], initSubsetArray[0][col][1]];
      // toggle piece
      //debugger;
      //tmpBoard.togglePiece(...rookIndex);
      toggle(tmpBoard, ...rookIndex);
      for (var row = 1; row < initSubsetArray.length; row++) {
        subsetArray.push(initSubsetArray[row].slice(0, col).concat(initSubsetArray[row].slice(col + 1)));
      }
      //console.log(subsetArray);
      recurse(subsetArray);
      if (callCount >= solutionLimit) {
        return;
      }
      // toggle piece back off again before iterating to the next col
      
      //tmpBoard.togglePiece(...rookIndex);
      toggle(tmpBoard, ...rookIndex);
      //console.log(tmpBoard.rows());
      
    }

  };
  var solutionCount = undefined;
  var boardArray = [];
  var subsetArray = initSubsetArray(n);
  //var tmpBoard = new Board({n: n});
  var tmpBoard = [];
  for (var i = 0; i < n; i++) {
    tmpBoard.push(Array(n).fill(0));
  }
  recurse(subsetArray);
  console.log(boardArray);
  return boardArray;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  solutionCount = getAllRookSolutions(n).length;
  return solutionCount;
};

window.getAllQueenSolutions = function(n, solutionLimit) {
  var callCount = 0;
  solutionLimit = solutionLimit === undefined ? Number.POSITIVE_INFINITY : solutionLimit;
  var rookBoardArray = getAllRookSolutions(n);
  var queenBoardArray = [];
  rookBoardArray.forEach(function(rookBoard) {
    if (!rookBoard.hasAnyMajorDiagonalConflicts() && !rookBoard.hasAnyMinorDiagonalConflicts()) {
      queenBoardArray.push(rookBoard);
      if (queenBoardArray.length >= solutionLimit) {
        return;
      }
    }
  });
//  console.log(n, queenBoardArray[1]);
  return queenBoardArray;
};
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  // debugger;
  return this.getAllQueenSolutions(n, 1)[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined;
  if (n === 0) {
    return 0;
  }
  solutionCount = getAllQueenSolutions(n).length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
