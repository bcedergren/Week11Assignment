let currentPlayer = "X";
let gameOver = false;

function makeMove(cell) {
  // Check if there is not text in the selected cell and
  // if the game is not over. If so, add the currentPlayer
  // to that cell.
  if (!cell.textContent && !gameOver) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    // Check to see if the currentPlayer has won
    if (checkWin()) {
      displayWinner(currentPlayer);
      gameOver = true;
      return;
    }

    // Check to see if there is a draw
    if (checkDraw()) {
      displayWinner("Draw");
      gameOver = true;
      return;
    }

    // Swap currentPlayer
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    $("#turn").text("It's " + currentPlayer + "'s turn");
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  // Check the cell patterns to determine if there is a winner
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      $(".cell")[a].textContent === currentPlayer &&
      $(".cell")[b].textContent === currentPlayer &&
      $(".cell")[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

// Check the cell patterns to determine if there is a draw
function checkDraw() {
  const cells = $(".cell");
  for (const cell of cells) {
    if (!cell.textContent) {
      return false;
    }
  }
  return true;
}

// Display the winner or draw
function displayWinner(winner) {
  let winnerText =
    winner === "Draw" ? "It's a Draw!" : "Player " + winner + " wins!";
  $("#winner").text(winnerText).removeClass("d-none");
}

// Clear the grid upon button click
function clearGrid() {
  const cells = $(".cell");
  for (const cell of cells) {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  }

  // Reset the currentPlayer display
  $("#turn").text("It's X's turn");
  currentPlayer = "X";
  gameOver = false;

  // Hide the alert element
  $(".alert").addClass("d-none");
}
