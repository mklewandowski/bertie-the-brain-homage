import React, {useState}  from 'react';
import { AppHeader } from './app-header';
import { GameSelect } from './game-select';
import './app.css';

function App() {
  const [showSelect, setShowSelect] = useState(true);
  const [showGame, setshowGame] = useState(false);
  const [showResults, setshowResults] = useState(false);

  return (
    <div className="app">
      <div className="app-shell">
        <AppHeader />
        { showSelect
          ? <GameSelect />
          : <div>to do</div>
        }
      </div>
    </div>
  );
}

export default App;
