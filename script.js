const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winner');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
        
        // Add hover effect for empty cells
        cell.addEventListener('mouseenter', function() {
            if (!this.classList.contains('x') && !this.classList.contains('o') && gameActive) {
                this.setAttribute('data-hover-mark', isXTurn ? 'X' : 'O');
            }
        });
        
        cell.addEventListener('mouseleave', function() {
            this.removeAttribute('data-hover-mark');
        });
    });
    isXTurn = true;
    gameActive = true;
    status.textContent = "X's turn";
}

function handleClick(e) {
    if (!gameActive) return;
    
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    
    // Place Mark
    placeMark(cell, currentClass);
    
    // Check Win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    isXTurn = !isXTurn;
    status.textContent = `${isXTurn ? "X" : "O"}'s turn`;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        const isWinning = combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
        
        if (isWinning) {
            combination.forEach(index => {
                cells[index].classList.add('winner');
            });
        }
        return isWinning;
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        status.textContent = "Game ended in a draw!";
    } else {
        status.textContent = `${isXTurn ? "X" : "O"} wins!`;
    }
}

restartButton.addEventListener('click', startGame);

// Start the game initially
startGame();
