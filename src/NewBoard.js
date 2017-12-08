var NewBoard = class {
  constructor(input) {
    if (Array.isArray(input)) {
      this.board = input.slice();
      this.n = input.length;
    } else if (typeof input === 'object') {
      this.board = Array(input.n).fill(null);
      this.n = input.n;
    }
  }
  
  hasAnyRowColConflicts() {
    return _.reduce(this.board, function(memo, num) {
      return memo + num;
    }, 0) !== (this.n - 1) * (this.n) / 2;
  }
  
  hasAnyDiagonalConflicts() {
    for (var row = 0; row < this.n - 1; row++) {
      for (var delta = 1; row + delta < this.n; delta++) {
        var source = this.board[row];
        var target = this.board[row + delta];
        if (source + delta === target || source - delta === target) {
          return true;
        }
      }
    }
    return false;
  }
  
  toMatrix() {
    var output = [];
    for (var i = 0; i < this.n; i++) {
      output.push(Array(n).fill(0));
    }
    for (var i = 0; i < this.n; i++) {
      output[i][this.board[i]] = 1;
    }
    return output;
  }
  
};