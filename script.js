var grid = document.getElementById("grid");
generateGrid();

function generateGrid() {
  grid.innerHTML="";
  for (var i = 0; i < 9; ++i) {
    row = grid.insertRow(i);
    for (var j = 0; j < 9; ++j) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var wrong = document.createAttribute("wrong");
      wrong.value = "false";
      cell.setAttributeNode(wrong);
    }
  }
  addNumbers();
}

function addNumbers() {
  for (var i = 0; i < 36; ++i) {
    var row = Math.floor(Math.random() * 8);
    var col = Math.floor(Math.random() * 8);
    var value =  Math.floor(Math.random() * 9) + 1;
    var cell = grid.rows[row].cells[col];
    if (checkSudokuRules(row, col, value)){
      cell.innerHTML = value;
    } else {
      --i;
    }
  }
}

function checkSudokuRules(row, col, value) {
  for ( let i = 0; i <= 8; i++ ) {
    if ( value == grid.rows[row].cells[i].innerHTML && i != col) {
      return false;
    }
  }
  for ( let i = 0; i <= 8; i++ ) {
    if ( value == grid.rows[i].cells[col].innerHTML && i != row) {
      return false;
    }
  }
  let row_offset = Math.floor(row/3)*3;
  let col_offset = Math.floor(col/3)*3;
  for ( let i = 0 + row_offset; i <= 2 + row_offset; i++ ) {
    for ( let j = 0 + col_offset; j <= 2 + col_offset; j++ ) {
      if ( value == grid.rows[i].cells[j].innerHTML && i != row && j != col) {
        return false;
      }
    }
  }
  return true;
}

function clickCell(cell) {
  var row = cell.parentNode.rowIndex;
  var col = cell.cellIndex;
  var value = grid.rows[row].cells[col].innerHTML;
  if (value == "") {
    value = 0;
  } else if (value == 9) {
    value = 0;
  }
  ++value;
  cell.innerHTML = value;
  if (!checkSudokuRules(row,col,value)) {
    cell.className = "wrong";
    cell.setAttribute("wrong","true");
  } else if (checkSudokuRules(row,col,value)) {
    cell.className = "right";
    cell.setAttribute("wrong","false");
  }
  checkWin();
}

function checkWin() {
  var won = true;
    for (var i = 0; i < 9; ++i) {
      for (var j = 0; j < 9; ++j ) {
        if ((grid.rows[i].cells[j].innerHTML == "") || (grid.rows[i].cells[j].getAttribute("wrong") == "true")) {
         won = false;
        }
      }
    }
  if (won) {
    document.getElementById("message").innerHTML = "You Won!";
  }
}
