import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';

const SetupGame = () => <h2>Setup Game</h2>;
const PlayGame = () => <h2>Play Game</h2>;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="setup" element={<SetupGame />} />
        <Route path="play" element={<PlayGame />} />
      </Routes>
    </div>
  );
}

export default App;
