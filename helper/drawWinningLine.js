import { addClassToElement } from './addClassToElement';

export const drawWinningLine = (statusObject) => {
    if (!statusObject)
        return;

    const { winner, direction, row, column, diagonal } = statusObject;

    if (winner === "draw")
        return;

    const gameBoard = document.querySelector('.game-board');
    addClassToElement(gameBoard, `${direction.toLowerCase}-${row || column || diagonal}`);

    setTimeout(() => {
        addClassToElement(board, 'full-line');
    }, 50);

}