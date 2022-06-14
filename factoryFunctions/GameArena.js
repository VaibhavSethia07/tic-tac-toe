export const GameArena = (board) => {
    let _board = board;
    let _turn = "Player";

    const setGameBoard = (board) => _board = board;

    const getGameBoard = () => _board;

    //  Print the game board
    const printFormattedBoard = () => {
        let formattedBoard = "";
        _board.forEach((cell, index) => {
            formattedBoard += cell ? ` ${cell} |` : `   |`;
            if ((index + 1) % 3 === 0) {
                formattedBoard = formattedBoard.slice(0, -1);
                if (index < 8)
                    formattedBoard += "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
            }
        })
        console.log('%c' + formattedBoard, 'color: #c11dd4;font-size:16px');
    }

    //  Check if the board is empty
    const isEmpty = () => {
        return _board.every(cell => !cell);
    }

    //  Check if the board is filled
    const isFull = () => {
        return _board.every(cell => cell);
    }

    /*  Inserts a symbol at the specified position
        @param {String} symbol specifies a symbol either 'X' or 'O' choosen by the user
        @param {Number} position specifies a position to insert the symbol
        @return {Boolean} determines the outcome of insert operation 
    */
    const insert = (symbol, position) => {
        if (![0, 1, 2, , 3, 4, 5, 6, 7, 8].includes(position)) {
            return false;
        }

        if (!['x', 'o'].includes(symbol)) {
            return false;
        }

        if (_board[position]) {
            return false;
        }

        _board[position] = symbol;
        return true;
    }

    // Clear the board
    const clearBoard = () => {
        _board.forEach((cell, index) => _board[index] = "")
    }

    /*  Checks if the board is at the terminal state i.e either someone is a winner or it's a draw
        @return {Object} returns an object containing the winner, direction of winning and row/column/diagonal number
    */
    const isTerminal = () => {
        if (isEmpty()) {
            return false;
        }

        // Checking rows
        if (_board[0] && _board[0] === _board[1] && _board[0] === _board[2]) {
            return { 'winner': _board[0], 'direction': 'H', 'row': 0 };
        }

        if (_board[3] && _board[3] === _board[4] && _board[3] === _board[5]) {
            return { 'winner': _board[3], 'direction': 'H', 'row': 1 };
        }

        if (_board[6] && _board[6] === _board[7] && _board[6] === _board[8]) {
            return { 'winner': _board[6], 'direction': 'H', 'row': 2 };
        }

        // Checking columns
        if (_board[0] && _board[0] === _board[3] && _board[0] === _board[6]) {
            return { 'winner': _board[0], 'direction': 'V', 'column': 0 };
        }

        if (_board[1] && _board[1] === _board[4] && _board[1] === _board[7]) {
            return { 'winner': _board[1], 'direction': 'V', 'column': 1 };
        }

        if (_board[2] && _board[2] === _board[5] && _board[2] === _board[8]) {
            return { 'winner': _board[2], 'direction': 'V', 'column': 2 };
        }

        // Checking diagonals
        if (_board[0] && _board[0] === _board[4] && _board[0] === _board[8]) {
            return { 'winner': _board[0], 'direction': 'D', 'diagonal': 1 };
        }

        if (_board[2] && _board[2] === _board[4] && _board[2] === _board[6]) {
            return { 'winner': _board[1], 'direction': 'D', 'diagonal': 2 };
        }

        if (isFull()) {
            return { 'winner': 'draw' };
        }

        return false;
    }

    /* Returns an array containing available moves for the current state */
    const getAvailableMoves = () => {
        let moves = [];

        _board.forEach((cell, index) => {
            if (!cell) {
                moves.push(index);
            }
        })

        return moves;
    }

    /* Toggles the turn between the player and AI */
    const toggleTurn = () => {
        if (_turn === "Player") {
            _turn = "AI";
        } else {
            _turn = "Player";
        }
    }

    const getTurn = () => _turn;

    return {
        setGameBoard,
        getGameBoard,
        printFormattedBoard,
        isEmpty,
        isFull,
        insert,
        clearBoard,
        isTerminal,
        getAvailableMoves,
        toggleTurn,
        getTurn
    }

};


