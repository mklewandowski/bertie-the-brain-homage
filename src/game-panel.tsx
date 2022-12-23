import React from "react";

import "./game-panel.css";

interface IProps {
  currentGameState: string[];
  onButtonClick: (cell: number) => void;
}

export const GamePanel: React.FC<IProps> = (props) => {
  const {currentGameState, onButtonClick} = props;
  return (
    <div className="game-panel">
      <div className="game-panel-grid">
        { currentGameState.map((gameState, i) =>
            <button
              className="game-button"
              onClick={() => {onButtonClick(i)}}
              key={`button-${i}`}
            >
              {gameState}
            </button>
        )}
      </div>
    </div>
  );
}
