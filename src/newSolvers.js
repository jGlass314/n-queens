var getAllRookSolutions = function(n, solutionLimit) {
  var callCount = 0;
  solutionLimit = solutionLimit === undefined ? Number.POSITIVE_INFINITY : solutionLimit;

  var recurse = function(array) {
    //base case
    if (array.length === 1) {
      return [array];
    }
    //  recussive case case
    // for element in array
    var retVals = [];
    for (var index = 0; index < array.length; index++) {
      var element = array[index];
      var recurseOn = array.slice(0, index).concat(array.slice(index + 1));
      var permutations = recurse(recurseOn);
      for (var permutationIdx = 0; permutationIdx < permutations.length; permutationIdx++) {
        retVals.push([element].concat(permutations[permutationIdx]));
      }
        // return array = recursive call
        // for returned value in return array
          // append returned value to element
    }
    // return array of permutations
    return retVals;
  };
  return recurse(_.range(n));
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
var findNRooksSolution = function(n) {
  //n = 4 > [0,1,2,3]
  if (n === 0) {
    return [];
  }
  return getAllRookSolutions(n, 1)[0].toMatrix();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
var countNRooksSolutions = function(n) {
  var allSolutions = getAllRookSolutions(n);
  // console.log('n:',n,'allSolutions:',allSolutions);
  return allSolutions.length;
};

var getAllQueenSolutions = function(n, solutionLimit) {
  var allRookSolutionArrays = getAllRookSolutions(n);
  var allQueenSolutionArrays = [];
  for (var i = 0; i < allRookSolutionArrays.length; i++) {
    var board = new NewBoard(allRookSolutionArrays[i]);
    if (!board.hasAnyDiagonalConflicts()) {
      allQueenSolutionArrays.push(board.board);
    }
  }
  return allQueenSolutionArrays;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
var findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  return getAllQueenSolutions(n, 1)[0].toMatrix();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
var countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var allSolutions = getAllQueenSolutions(n);
  console.log('n:',n,'allSolutions:',allSolutions);
  return allSolutions.length;
};