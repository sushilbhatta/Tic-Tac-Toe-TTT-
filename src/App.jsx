import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
const PLAYERS = { X: "Player 1", O: "Player 2" };

//Static array defin=end for the board symbol
//col==>1 col==>2 col==>3
const ININTIAL_GAME_BOARD = [
  [null, null, null], //row==>1
  [null, null, null], // row==>2
  [null, null, null], //row==>3
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...ININTIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    // player ko value gameBoard[row][col] position ma assign vato
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  // state lifting Log and gameboard components
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]); //evalutes the turn of player
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        // we could have got the current player from setActivePlayer state too but it is not good practice to mix the two
        //  state variable as currentPlayer from that state depends on that environment and could not always be avaliable.
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            inintialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === "X"}
            onPlayerChange={handlePlayerNameChange}
          ></Player>
          <Player
            inintialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === "O"}
            onPlayerChange={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* //hasDrawis undefined */}
        {/* {console.log(winner)} */}
        <GameBoard
          board={gameBoard}
          onSelectSquare={handleSelectSquare}
        ></GameBoard>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
export default App;
