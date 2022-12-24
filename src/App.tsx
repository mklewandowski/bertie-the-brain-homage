import React, {useState}  from 'react';
import { getBertieMove, getGameResult, GameResultType } from './utils';
import { AppHeader } from './app-header';
import { GameSelect } from './game-select';
import { GamePanel } from './game-panel';
import './app.css';

const kInitialGameState = ["","","","","","","","",""];

function App() {
  const [showGame, setshowGame] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [gameState, setGameState] = useState(kInitialGameState);
  const [gameResult, setGameResult] = useState(GameResultType.inProgress);
  const [showResults, setShowResults] = useState(false);

  const handleHumanStart = () => {
    setshowGame(true);
  }
  const handleBertieStart = () => {
    setshowGame(true);
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
    let newGameResult = getGameResult(newGameState);

    if (newGameResult === GameResultType.inProgress) // no winner, let Bertie move
    {
      const bertieCell = getBertieMove(newGameState, difficulty);
      newGameState[bertieCell] = "O";
      newGameResult = getGameResult(newGameState);
    }

    setGameState(newGameState);
    if (newGameResult != GameResultType.inProgress)
    {
      setGameResult(newGameResult);
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
              gameResult={gameResult}
            />
          }
      </div>
    </div>
  );
}

export default App;
