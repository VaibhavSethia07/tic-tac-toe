import { GameArena } from './factoryFunctions/GameArena'
import { Player } from './factoryFunctions/Player'

const gameArena = GameArena(["x", "o", "", "", "", "", "o", "", "x"]);
gameArena.printFormattedBoard();
const player = Player();

console.log(player.getBestMove(gameArena, false));
console.log(player.getNodesMap());