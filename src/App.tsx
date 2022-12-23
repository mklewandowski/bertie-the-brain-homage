import React, {useState}  from 'react';
import { AppHeader } from './app-header';
import { GameSelect } from './game-select';
import { GamePanel } from './game-panel';
import './app.css';

function App() {
  const [showSelect, setShowSelect] = useState(true);
  const [showGame, setshowGame] = useState(false);
  const [bertieMovesFirst, setBertieMovesFirst] = useState(false);
  const [showResults, setshowResults] = useState(false);

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
            ? <GamePanel />
            : <div>to do</div>
          }
      </div>
    </div>
  );
}

export default App;
