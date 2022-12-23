import React from "react";

import "./game-select.css";

export const GameSelect: React.FC = () => {
  return (
    <div className="game-select">
      <div className="intro-text">Bertie, the electronic wonder, challenges YOU to a game of tic-tac-toe! Can you defeat a computing machine?</div>
      <button className="game-select-button">Human Goes First</button>
      <button className="game-select-button">Bertie Goes First</button>
    </div>
  );
}
