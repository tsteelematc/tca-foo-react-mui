import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { SetupGame } from './SetupGame';
import { PlayGame } from './PlayGame';
import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const getUniquePlayers = (results) => (
  [... new Set(results.flatMap(x => x.players.map(y => y.name)))]
);

const saveGameToCloud = async (email, gameResult) => {

  const dynamoGame = {
    pk: email
    , sk: `tca-foo-react-mui#${gameResult.end}`

    , ts: gameResult.end
    , user: email
    , app: 'tca-foo-react-mui'

    , gsi1pk: 'tca-foo-react-mui'
    , gsi1sk: gameResult.end

    , game: gameResult
  };

  const marshalledGame = marshall(
    dynamoGame
    , {
      removeUndefinedValues: true
      , convertClassInstanceToMap: true
    }
  );

  console.log(marshalledGame);

  const options = {
    method: 'POST',
    body: JSON.stringify({
      TableName: "tca-data",
      Item: marshalledGame
    })  
  };

  await fetch(
    "https://32wop75hhc.execute-api.us-east-1.amazonaws.com/prod/data"
    , options 
  );
};

const loadGamesFromCloud = async (email) => {
  const url = `https://32wop75hhc.execute-api.us-east-1.amazonaws.com/prod/data/?user=${email}&game=tca-foo-react-mui`;
  console.log("url", url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);
  const unmarshalledData = data.Items.map(x => unmarshall(x, {convertEmptyValues: true}));
  const gameResults = unmarshalledData.map(x => x.game);
  return gameResults;    
};

const App = () => {

  // Two items of "lifted state," game results and current game info.
  const [results, setResults] = useState([]);
  
  const [email, setEmail] = useState("");

  const [currentGame, setCurrentGame] = useState({
    players: []
    , start: ""
  });

  const loadGameResults = async () => {
    //setResults(await localforage.getItem("gameResults") ?? []);
    setResults(await loadGamesFromCloud(email) ?? []);
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

    await saveGameToCloud(email, gameResult);

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
