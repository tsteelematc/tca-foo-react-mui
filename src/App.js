import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { SetupGame } from './SetupGame';
import { PlayGame } from './PlayGame';
import { useState } from 'react';



const game1 = {
  start: "2022-02-14T15:14:30"
  , end: "2022-02-14T15:20:00"
  , winner: "Me"
  , players: [{ name: "Me", order: 1}, { name: "Taylor", order: 2}, {name: "Jack", order: 3}]
};

const game2 = {
  start: "2022-02-14T21:00:30"
  , end: "2022-02-14T21:30:30"
  , winner: "Stephanie"
  , players: [{ name: "Me", order: 1}, { name: "Stephanie", order: 2}, {name: "Jack", order: 3}]
};

const gameResults = [
  game1
  , game2
];


const App = () => {

  const [results, setResults] = useState(gameResults);

  const addGameResult = (gameResult) => {
    setResults(
      [
        ...results
        , gameResult
      ]
    );
  
    console.log(gameResults);
  };
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Home 
            gameResults={results}
          />
        } />
        <Route path="setup" element={<SetupGame />} />
        <Route path="play" element={
          <PlayGame 
            addGameResult={addGameResult}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
