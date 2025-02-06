import Square from "./Square";
import PropTypes from "prop-types";
import "./GameHistory.css";

const GameHistory = ({ history, winners }) => {
  return (
    <div className="game-history">
      <h2>Game History</h2>
      <ul className="board">
        {history.map((boardState, index) => (
          <li key={index}>
            <div className="board">
              {Array(3)
                .fill(null)
                .map((_, row) => (
                  <div key={row} className="board-row">
                    {Array(3)
                      .fill(null)
                      .map((_, col) => (
                        <Square key={col} value={boardState[row * 3 + col]} />
                      ))}
                  </div>
                ))}
              {winners[index] ? (
                <p>Winner: {winners[index]}</p>
              ) : (
                <p>No winner</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

GameHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.array).isRequired,
  winners: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GameHistory;
