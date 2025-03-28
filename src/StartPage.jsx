import "./StartPage.css";
import { useState } from "react";
import MemoryGame from "./Memory";

function StartPage() {
  const [theme, setTheme] = useState("numbers");
  const [gridSize, setGridSize] = useState(4); 
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return gameStarted ? (
    <MemoryGame gridSize={gridSize} />
  ) : (
    <div className="app-container">
      <h1 className="game-title">Memory Game</h1>
      <div className="settings-container">
        <div className="setting">
          <h3 className="SelectThemeh3">Select Theme</h3>
          <div className="button-group">
            <button
              className={`btn ${theme === "numbers" ? "active" : ""}`}
              onClick={() => setTheme("numbers")}
            >
              Numbers
            </button>
            <button
              className={`btn ${theme === "icons" ? "active" : ""}`}
              onClick={() => setTheme("icons")}
            >
              Icons
            </button>
          </div>
        </div>
        <div className="setting">
          <h3 className="GridSizeh3">Grid Size</h3>
          <div className="button-group">
            <button
              className={`btn ${gridSize === 4 ? "active" : ""}`}
              onClick={() => setGridSize(4)}
            >
              4x4
            </button>
            <button
              className={`btn ${gridSize === 6 ? "active" : ""}`}
              onClick={() => setGridSize(6)}
            >
              6x6
            </button>
          </div>
        </div>

        <button className="start-btn" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default StartPage;
