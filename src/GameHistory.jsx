import Square from "./Square";
import PropTypes from "prop-types";

function GameHistory({ history }) {
  return (
    <div>
      <h2>Game History</h2>
      <ul>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

GameHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default GameHistory;
