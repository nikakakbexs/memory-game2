import "./App.css";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("numbers");
  const [gridSize, setGridSize] = useState("4x4");

  return (
    <div className="app-container">
      <h1 className="game-title">Memory Game</h1>
      <div className="settings-container">
        <div className="setting">
          <h3 className="SelectThemeh3">Select Theme</h3>
          <div className="button-group">
            <button
              className={`btn ${theme === "numbers" ? "active" : "inactive"}`}
              onClick={() => setTheme("numbers")}>Numbers</button>
            <button
              className={`btn ${theme === "icons" ? "active" : "inactive"}`}
              onClick={() => setTheme("icons")}>Icons</button>
          </div>
        </div>
        <div className="setting">
          <h3 className="GridSizeh3">Grid Size</h3>
          <div className="button-group">
            <button
              className={`btn ${gridSize === "4x4" ? "active" : "inactive"}`}
              onClick={() => setGridSize("4x4")}>4x4</button>
            <button
              className={`btn ${gridSize === "6x6" ? "active" : "inactive"}`}
              onClick={() => setGridSize("6x6")}>6x6</button>
          </div>
        </div>

        <button className="start-btn">Start Game</button>
      </div>
    </div>
  );
}

export default App;
