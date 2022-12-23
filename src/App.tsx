import React, {useState}  from 'react';
import { AppHeader } from './app-header';
import { GameSelect } from './game-select';
import { GamePanel } from './game-panel';
import './app.css';

const kInitialGameState = ["","","","","","","","",""];

function App() {
  const [showSelect, setShowSelect] = useState(true);
  const [showGame, setshowGame] = useState(false);
  const [bertieMovesFirst, setBertieMovesFirst] = useState(false);
  const [showResults, setshowResults] = useState(false);
  const [gameState, setGameState] = useState(kInitialGameState);

  const handleHumanStart = () => {
    setShowSelect(false);
    setshowGame(true);
    setBertieMovesFirst(false);
  }
  const handleBertieStart = () => {
    setShowSelect(false);
    setshowGame(true);
    setBertieMovesFirst(true);
  }
  const handleButtonClick = (cell: number) => {
    console.log(cell);
    let newGameState = [...gameState];
    newGameState[cell] = "X";
    setGameState(newGameState);
  }

  return (
    <div className="app">
      <div className="app-shell">
        <AppHeader />
        { showSelect
          ? <GameSelect
              onHumanStartClick={handleHumanStart}
              onBertieStartClick={handleBertieStart}
            />
          : showGame
            ? <GamePanel
                currentGameState={gameState}
                onButtonClick={handleButtonClick}

              />
            : <div>to do</div>
          }
      </div>
    </div>
  );
}

export default App;
