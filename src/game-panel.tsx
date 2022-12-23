import React from "react";

import "./game-panel.css";

interface IProps {
  currentGameState: string[];
  onGridClick: (cell: number) => void;
  showResults: boolean;
  onRestartClick: () => void;
  winner: number;
}

export const GamePanel: React.FC<IProps> = (props) => {
  const {currentGameState, onGridClick, showResults, onRestartClick, winner} = props;
  const winMessage = winner === 2 ? "YOU WIN! You have defeated the electronic wonder." : "BERTIE WINS! The computer brain triumphs!";
  return (
    <div className="game-panel">
      <div className="game-panel-grid">
        { currentGameState.map((gameState, i) =>
            <button
              className="game-button"
              onClick={() => {onGridClick(i)}}
              key={`button-${i}`}
            >
              {gameState}
            </button>
        )}
      </div>
      { showResults &&
        <div>
          <div className="game-over">{winMessage}</div>
          <button className="restart-button" onClick={onRestartClick}>PLAY AGAIN</button>
        </div>
      }
    </div>
  );
}
