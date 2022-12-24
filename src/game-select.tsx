import React from "react";

import "./game-select.css";

interface IProps {
  onBertieStartClick: () => void;
  onHumanStartClick: () => void;
  currentDifficulty: number;
  setCurrentDifficulty: (difficulty: number) => void;
}

export const GameSelect: React.FC<IProps> = (props) => {
  const {onBertieStartClick, onHumanStartClick, currentDifficulty, setCurrentDifficulty} = props;
  const handleChange = (event: any) => {
    setCurrentDifficulty(event.target.value);
  }
  return (
    <div className="game-select">
      <div className="intro-text">Bertie, the electronic wonder, challenges YOU to a game of tic-tac-toe! Can you defeat a computing machine?</div>
      <button className="game-select-button" onClick={onHumanStartClick}>Human Goes First</button>
      <button className="game-select-button" onClick={onBertieStartClick}>Bertie Goes First</button>
      <div className="slider-container">
          <input type="range" min="0" max="2" value={currentDifficulty} className="slider" id="myRange" onChange={handleChange} />
          <div>
            <span className="diff">Easy</span>
            <span className="diff">Medium</span>
            <span className="diff">Hard</span>
          </div>
        </div>
    </div>
  );
}
