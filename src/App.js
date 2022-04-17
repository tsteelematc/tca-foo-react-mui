import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { SetupGame } from './SetupGame';
import { PlayGame } from './PlayGame';
import { useState, useEffect } from 'react';
import localforage from 'localforage';

const getUniquePlayers = (results) => (
  [... new Set(results.flatMap(x => x.players.map(y => y.name)))]
);

const App = () => {

  // Two items of "lifted state," game results and current game info.
  const [results, setResults] = useState([]);
  
  const [email, setEmail] = useState("");

  const [currentGame, setCurrentGame] = useState({
    players: []
    , start: ""
  });

  const loadGameResults = async () => {
    setResults(await localforage.getItem("gameResults") ?? []);
  };

  const loadEmail = async () => {
    setEmail(await localforage.getItem("email") ?? "");
  };

  const saveEmail = async (e) => {

    // Save it to local storage.
    await localforage.setItem("email", e);

    // Reread from local storage into state.
    loadEmail();
  };

  useEffect(
    () => {
      loadGameResults();
      loadEmail();
    } 
    , []
  );

  const addGameResult = async (gameResult) => {

    const newResults = [
      ...results
      , gameResult
    ];

    setResults(newResults);
  
    await localforage.setItem("gameResults", newResults);

    console.log([
      ...results 
      , gameResult
    ]);
  };
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Home 
            gameResults={results}
            uniquePreviousPlayers={getUniquePlayers(results)}
            email={email}
            saveEmail={saveEmail}
          />
        } />
        <Route path="setup" element={
          <SetupGame 
            uniquePreviousPlayers={getUniquePlayers(results)}
            setCurrentGame={setCurrentGame}
          />
        } />
        <Route path="play" element={
          <PlayGame 
            addGameResult={addGameResult}
            currentGame={currentGame}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
