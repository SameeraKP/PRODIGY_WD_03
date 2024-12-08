let currentPlayer = "X";
let gameActive = true;
let board = Array(9).fill(null);

const symbolScreen = document.getElementById("symbol-screen");
const opponentScreen = document.getElementById("opponent-screen");
const gameScreen = document.getElementById("game-screen");
const status = document.getElementById("status");
const boardCells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");

document.getElementById("choose-x").addEventListener("click", () => chooseSymbol("X"));
document.getElementById("choose-o").addEventListener("click", () => chooseSymbol("O"));

function chooseSymbol(symbol) {
    currentPlayer = symbol;
    symbolScreen.classList.add("hidden");
    opponentScreen.classList.remove("hidden");
}


document.getElementById("human").addEventListener("click", () => startGame("human"));
document.getElementById("computer").addEventListener("click", () => startGame("computer"));

function startGame(opponent) {
    opponentScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    status.textContent = `Player ${currentPlayer}'s turn`;
    if (opponent === "computer") {
        alert("Computer opponent not yet implemented.");
    }
}

// Handle cell clicks
boardCells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (gameActive && !board[index]) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (board.every(cell => cell)) {
                status.textContent = "It's a tie!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

// Check for a win
function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6],            // Diagonals
    ];
    return winningCombos.some(combo =>
        combo.every(index => board[index] === currentPlayer)
    );
}

// Restart the game
restartButton.addEventListener("click", () => {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    boardCells.forEach(cell => (cell.textContent = ""));
    status.textContent = `Player ${currentPlayer}'s turn`;
});
