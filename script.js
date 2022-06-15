import { GameArena } from './factoryFunctions/GameArena'
import { Player } from './factoryFunctions/Player'
import { addClassToElement, drawWinningLine } from './helper/addClassToElement'

// Human selects a symbol
let humanSymbol;

const newGame = (depth, startingPlayer) => {
    const player = Player(parseInt(depth), (symbol === 'x') ? 'o' : 'x');
    const gameBoard = GameArena(["", "", "", "", "", "", "", "", ""]);
    const aiSymbol = player.getSymbol();

    gameBoard.setPlayerTurn(startingPlayer === 1 ? "Player" : "AI");

    const gameBoardDIV = document.querySelector('.game-board');
    gameBoardDIV.className = "";
    gameBoardDIV.innerHTML = `<div class="cell-wrap">
    <button class="cell-0"></button>
    <button class="cell-1"></button>
    <button class="cell-2"></button>
    <button class="cell-3"></button>
    <button class="cell-4"></button>
    <button class="cell-5"></button>
    <button class="cell-6"></button>
    <button class="cell-7"></button>
    <button class="cell-8"></button>
    </div>
    `;

    const htmlCells = [...gameBoardDIV.querySelector('.cell-wrap').children];

    // Computer starts the game
    if (!startingPlayer) {
        const centerAndCorner = [0, 2, 4, 6, 8];
        const firstChoice = htmlCells[Math.floor(Math.random() * centerAndCorner.length)];

        gameBoard.insert(aiSymbol, firstChoice);
        addClassToElement(htmlCells[firstChoice], aiSymbol);

        gameBoard.togglePlayerTurn();
    }

    gameBoard.getGameBoard().forEach((cell, index) => {
        htmlCells[index].addEventListener('click', () => {
            if (cell === "x" || cell === "o" || gameBoard.isTerminal() || gameBoard.getPlayerTurn() !== "Player") {
                return false;
            }

            gameBoard.insert(humanSymbol, index);
            addClassToElement(htmlCells[index], humanSymbol);

            gameBoard.togglePlayerTurn();

            player.getBestMove(gameBoard, !(humanSymbol === "x"), depth, best => {
                gameBoard.insert(aiSymbol, best);
                addClassToElement(htmlCells[index], aiSymbol);

                if (gameBoard.isTerminal()) {
                    if (gameBoard.isTerminal().winner !== "draw") {
                        drawWinningLine();
                        // Show winner modal
                        return;
                    }
                }
            })

            gameBoard.togglePlayerTurn();
        })
    })

    if (cell)
        addClassToElement(htmlCells[index], cell);
}

document.addEventListener("DOMContentLoaded", () => {
    let depth = -1;
    let startingPlayer = 1;

    newGame(depth, startingPlayer);
    document.querySelector('.new-game').addEventListener('click', () => {
        const startingPlayerDIV = document.querySelector('.starting-player');
        const startingPlayer = startingPlayerDIV.options[startingPlayerDIV.selectedIndex].value;

        const depthDIV = document.querySelector('.depth');
        const depth = depthDIV.options[depthDIV.selectedIndex].value;

        newGame(depth, startingPlayer);
    })

})