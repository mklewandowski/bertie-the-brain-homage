import React, {useState}  from 'react';
import { getBertieMove, getWinner } from './utils';
import { AppHeader } from './app-header';
import { GameSelect } from './game-select';
import { GamePanel } from './game-panel';
import './app.css';

const kInitialGameState = ["","","","","","","","",""];

function App() {
  const [showGame, setshowGame] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [bertieMovesFirst, setBertieMovesFirst] = useState(false);
  const [gameState, setGameState] = useState(kInitialGameState);
  const [winner, setWinner] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleHumanStart = () => {
    setshowGame(true);
    setBertieMovesFirst(false);
  }
  const handleBertieStart = () => {
    setshowGame(true);
    setBertieMovesFirst(true);
    let newGameState = [...gameState];
    const bertieCell = getBertieMove(newGameState, difficulty);
    newGameState[bertieCell] = "O";
    setGameState(newGameState);
  }
  const handleGridClick = (cell: number) => {
    if (gameState[cell] !== "" || showResults)
      return;

    // set the player move and see if it wins
    let newGameState = [...gameState];
    newGameState[cell] = "X";
    let winner = getWinner(newGameState);

    if (winner === 0) // no winner, let Bertie move
    {
      const bertieCell = getBertieMove(newGameState, difficulty);
      newGameState[bertieCell] = "O";
      winner = getWinner(newGameState);
    }

    setGameState(newGameState);
    if (winner === 1 || winner === 2 || winner === 3)
    {
      setWinner(winner);
      setShowResults(true);
    }
  }

  const handleRestartClick = () => {
    setShowResults(false);
    setshowGame(false);
    let newGameState = [...kInitialGameState];
    setGameState(newGameState);
  }

  return (
    <div className="app">
      <div className="app-shell">
        <AppHeader />
        { !showGame
          ? <GameSelect
              onHumanStartClick={handleHumanStart}
              onBertieStartClick={handleBertieStart}
              currentDifficulty={difficulty}
              setCurrentDifficulty={setDifficulty}
            />
          : <GamePanel
              currentGameState={gameState}
              onGridClick={handleGridClick}
              showResults={showResults}
              onRestartClick={handleRestartClick}
              winner={winner}
            />
          }
      </div>
    </div>
  );
}

export default App;
