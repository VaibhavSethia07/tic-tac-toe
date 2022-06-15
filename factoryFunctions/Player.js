import { GameArena } from "./GameArena";

export const Player = (depth = -1, symbol) => {
    const maxDepth = depth;
    const symbol = symbol;
    let nodesMap = new Map();

    const getMaxDepth = () => maxDepth;

    const getNodesMap = () => nodesMap;

    const getSymbol = () => symbol;

    const getBestMove = (gameBoard, isMaximizing = true, depth = 0, callback = () => { }) => {
        if (depth === 0) {
            nodesMap.clear();
        }

        if (gameBoard.isTerminal() || depth === maxDepth) {
            if (gameBoard.isTerminal().winner === "x") {
                return 100 - depth;
            } else if (gameBoard.isTerminal().winner === "o") {
                return -100 + depth;
            }

            return 0;
        }

        if (isMaximizing) {
            let best = -100;
            gameBoard.getAvailableMoves().forEach(index => {
                const newGameBoard = GameArena(gameBoard.getGameBoard());

                newGameBoard.insert('x', index);

                const nodeValue = getBestMove(newGameBoard, !isMaximizing, depth + 1, callback);
                best = Math.max(best, nodeValue);

                if (depth === 0) {
                    const moves = nodesMap.has(nodeValue) ? `${nodesMap.get(nodeValue)}, ${index} ` : index;
                    nodesMap.set(nodeValue, moves);
                }
            })


            if (depth === 0) {
                let bestIndex = "";
                if (typeof nodesMap.get(best) === 'string') {
                    const arr = nodesMap.get(best).split(',');
                    const rand = Math.floor(Math.random() * arr.length);
                    bestIndex = arr[rand];
                } else {
                    bestIndex = nodesMap.get(best);
                }
                callback(bestIndex);
                return bestIndex;
            }

            return best;
        } else {
            let best = 100;
            gameBoard.getAvailableMoves().forEach(index => {
                const newGameBoard = GameArena(gameBoard.getGameBoard());

                newGameBoard.insert('o', index);

                const nodeValue = getBestMove(newGameBoard, !isMaximizing, depth + 1, callback);
                best = Math.min(best, nodeValue);

                if (depth === 0) {
                    const moves = nodesMap.has(nodeValue) ? `${nodesMap.get(nodeValue)},${index}` : index;
                    nodesMap.set(nodeValue, moves);
                }
            })

            if (depth === 0) {
                let bestIndex = "";
                if (typeof nodesMap.get(best) === "string") {
                    const arr = nodesMap.get(best).split(',');
                    const rand = Math.floor(Math.random() * arr.length);
                    bestIndex = arr[rand];
                } else {
                    bestIndex = nodesMap.get(best);
                }
                callback(bestIndex);
                return bestIndex;
            }

            return best;
        }
    }

    return { getMaxDepth, getNodesMap, getSymbol, getBestMove };
}