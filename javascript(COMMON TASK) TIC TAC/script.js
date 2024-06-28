let currentplayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameactive = true;
let playerxTime = 10;
let playeroTime = 10;
let timer;
const winningcondi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const buttons = document.querySelectorAll(".button-option");
const newGameButton = document.getElementById("new-game");
const popup = document.querySelector(".popup");
const message = document.getElementById("message");
const head = document.getElementById("head");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => handleMove(index));
});

newGameButton.addEventListener("click", resetGame);

function handleMove(index) {
    if (board[index] !== "" || !gameactive) return;

    board[index] = currentplayer;
    buttons[index].textContent = currentplayer;

    if (checkWin()) {
        endGame(`${currentplayer} wins!`);
        return;
    }

    if (board.every(cell => cell !== "")) {
        endGame("It's a draw!");
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    clearInterval(timer);
    currentplayer = currentplayer === "X" ? "O" : "X";
    head.textContent = `Player ${currentplayer}'s Move`;

    if (currentplayer === "X") {
        playerxTime = 10;
    } else {
        playeroTime = 10;
    }

    startTimer();
}
function startTimer() {
    timer = setInterval(() => {
        if (currentplayer === "X") {
            playerxTime--;
            document.getElementById("playerXTime").textContent = `Player X: ${playerxTime}s`;
            if (playerxTime <= 0) {
                endGame("Player O wins by timeout!");
            }
        } else {
            playeroTime--;
            document.getElementById("playerOTime").textContent = `Player O: ${playeroTime}s`;
            if (playeroTime <= 0) {
                endGame("Player X wins by timeout!");
            }
        }
    }, 1000);
}


function checkWin() {
    return winningcondi.some(condition => {
        const [a, b, c] = condition;// CHECK EACH AND EVRY CONDITION IN THE LIST
        return board[a] === currentplayer && board[a] === board[b] && board[a] === board[c];
    });
}

function endGame(messageText) {
    clearInterval(timer);
    gameactive = false;
    popup.classList.remove("hide");
    message.textContent = messageText;
    playerxTime = 10;
    playeroTime = 10;
}

function resetGame() {
    console.log(1);
    board = ["", "", "", "", "", "", "", "", ""];
    buttons.forEach(button => (button.textContent = ""));
    gameactive = true;
    currentplayer = "X";
    head.textContent = `Player ${currentplayer}'s Move`;
    popup.classList.add("hide");
    
    startTimer();
}


startTimer();
