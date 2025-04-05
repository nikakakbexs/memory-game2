import React from "react";
import "./Results.css";

const Results = ({ moves, time, onRestart, onNewGame }) => {
  return (
    <div className="results-overlay">
      <div className="results-modal">
        <h1 className="results-title">You did it!</h1>
        <p className="results-subtitle">Game over! Here's how you got on...</p>

        <div className="results-stats">
          <div className="stat-row">
            <span className="stat-label">Time Elapsed</span>
            <span className="stat-value">{time}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Moves Taken</span>
            <span className="stat-value">{moves} Moves</span>
          </div>
        </div>

        <div className="results-actions">
          <button className="btn-primary" onClick={onRestart}>
            Restart
          </button>
          <button className="btn-secondary" onClick={onNewGame}>
            Setup New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;