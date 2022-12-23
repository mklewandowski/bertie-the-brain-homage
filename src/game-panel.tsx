import React from "react";

import "./game-panel.css";

export const GamePanel: React.FC = () => {
  return (
    <div className="game-panel">
      <div className="game-panel-grid">
        <button className="game-button"></button>
        <button className="game-button"></button>
        <button className="game-button"></button>

        <button className="game-button"></button>
        <button className="game-button"></button>
        <button className="game-button"></button>

        <button className="game-button"></button>
        <button className="game-button"></button>
        <button className="game-button"></button>
      </div>
    </div>
  );
}
