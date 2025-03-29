import React from "react";
import "./Header.css";

const Header = ({ onRestart, onNewGame }) => {
  return (
    <div className="header">
      <div className="header-left">
        <h2>memory</h2>
      </div>
      <div className="header-buttons">
        <button className="header-button" onClick={onRestart}>
          Restart Game
        </button>
        <button className="header-button" onClick={onNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Header;
