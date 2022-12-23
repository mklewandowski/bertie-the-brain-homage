import React from "react";

import "./game-select.css";

interface IProps {
  onBertieStartClick: () => void;
  onHumanStartClick: () => void;
}

export const GameSelect: React.FC<IProps> = (props) => {
  const {onBertieStartClick, onHumanStartClick} = props;
  return (
    <div className="game-select">
      <div className="intro-text">Bertie, the electronic wonder, challenges YOU to a game of tic-tac-toe! Can you defeat a computing machine?</div>
      <button className="game-select-button" onClick={onHumanStartClick}>Human Goes First</button>
      <button className="game-select-button" onClick={onBertieStartClick}>Bertie Goes First</button>
    </div>
  );
}
