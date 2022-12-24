import React from "react";
import { GameResultType } from "./utils";
import "./game-panel.css";

interface IProps {
  currentGameState: string[];
  onGridClick: (cell: number) => void;
  showResults: boolean;
  onRestartClick: () => void;
  gameResult: GameResultType;
}

export const GamePanel: React.FC<IProps> = (props) => {
  const {currentGameState, onGridClick, showResults, onRestartClick, gameResult} = props;
  const winMessage = gameResult === GameResultType.bertieWin
    ? "BERTIE WINS! The computer brain triumphs!"
    : gameResult === GameResultType.playerWin ? "YOU WIN! You beat the electronic wonder." : "It's a draw. Bertie wants a rematch."
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
        : <div className="game-status">Human: X, Bertie: O</div>
      }
    </div>
  );
}
