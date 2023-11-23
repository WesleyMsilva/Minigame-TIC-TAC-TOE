const playerXscore = document.querySelector("#playerXScore");
const playerOScore = document.querySelector("#playerOScore");

let playerXWins = 0;
let playerOWins = 0;

let currentPlayer = "X";
let board =['', '', '', '', '', '', '', '', '',];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const message = document.querySelector('#message');

function makeMove(cell) {
    const cellIndex = Array.from(cell.parentElement.children).indexOf(cell)
    if(board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        resultText();
    }
}

function resultText() {
    if(checkWinner()){
        message.textContent = `Player ${currentPlayer} won!`;
        gameActive = false
    } else if(board.every((cell) => cell !== '')) {
        message.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for(let combo of winningCombos) {
        const [a, b, c] = combo;

        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            scoreUpdate(a);
            return true
        }
    }
    return false;
}

function scoreUpdate(a) {
    if(board[a] === 'X') {
        playerXWins++
        playerXscore.textContent = playerXWins;
    } else if (board[a] === 'O') {
        playerOWins++;
        playerOScore.textContent = playerOWins;
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', '',];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    })
}

resetBoard();