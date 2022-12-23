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
  const winMessage = winner === 1
    ? "BERTIE WINS! The computer brain triumphs!"
    : winner === 2 ? "YOU WIN! You defeated the electronic wonder." : "It's a draw. Bertie wants a rematch."
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
      { showResults
        ? <div>
            <div className="game-over">{winMessage}</div>
            <button className="restart-button" onClick={onRestartClick}>PLAY AGAIN</button>
          </div>
        : <div className="game-status">Human: X, Bertie: 0</div>
      }
    </div>
  );
}
