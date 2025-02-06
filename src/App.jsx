import "./App.css";
import { useState } from "react";
import Square from "./Square";
import GameHistory from "./GameHistory";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([]);
  const [winners, setWinners] = useState([]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    // Check for a winner after the move
    const winner = calculateWinner(newBoard);
    if (winner) {
      setHistory([...history, newBoard]); // Save the board state only if there's a winner
      setWinners([...winners, winner]);
    }
  };

  const renderSquare = (index) => (
    <Square value={board[index]} onClick={() => handleClick(index)} />
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const isGameOver = winner || board.every((square) => square !== null); // Check if the game is over

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div key={row} className="board-row">
              {Array(3)
                .fill(null)
                .map((_, col) => renderSquare(row * 3 + col))}
            </div>
          ))}
      </div>
      {isGameOver && (
        <div>
          <h2>{winner ? `Winner: ${winner}` : "It's a Draw!"}</h2>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}
      <GameHistory history={history} winners={winners} />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
