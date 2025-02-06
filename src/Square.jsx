import PropTypes from "prop-types";
import "./Square.css"; // Import the stylesheet

function Square({ value, onClick }) {
  return (
    <button
      className="square"
      onClick={onClick}
      aria-label={`Square with value ${value}`}
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Square;
