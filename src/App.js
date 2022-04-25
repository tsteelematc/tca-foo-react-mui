import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { SetupGame } from './SetupGame';
import { PlayGame } from './PlayGame';
import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { saveGameToCloud, loadGamesFromCloud } from './TcaCloudApi';

const getUniquePlayers = (results) => (
  [... new Set(results.flatMap(x => x.players.map(y => y.name)))]
);

const App = () => {

  // Two items of "lifted state," game results and current game info.
  const [results, setResults] = useState([]);

  const [currentGame, setCurrentGame] = useState({
    players: []
    , start: ""
  });

  const [emailAddress, setEmailAddress] = useState("");

  const updateEmailAddress = async (newEmailAddress) => {

    // Update the state, after saving the email in local storage.
    setEmailAddress(await localforage.setItem('email', newEmailAddress));

  };

  const loadGameResults = async () => {

    // Update the emailAddress state, after loading the email from local storage.
    setEmailAddress(await localforage.getItem("email") ?? "");

    // Then, if we have an email, load the game results.
    if (emailAddress.length > 0) {
      setResults(await loadGamesFromCloud(emailAddress, "tca-foo-react-mui") ?? []);
    }
  };

  useEffect(
    () => {
      loadGameResults();
    } 
    , [emailAddress]
  );

  const addGameResult = async (gameResult) => {

    const newResults = [
      ...results
      , gameResult
    ];

    setResults(newResults);
  
    // await localforage.setItem("gameResults", newResults);
    await saveGameToCloud(
      emailAddress
      , "tca-foo-react-mui"
      , gameResult.end          // new Date().toISOString()
      , gameResult
    );

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
            emailAddress={emailAddress}
            updateEmailAddress={updateEmailAddress}
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
