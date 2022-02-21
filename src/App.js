import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';

const Home = () => <h2>Home</h2>;
const SetupGame = () => <h2>Setup Game</h2>;
const PlayGame = () => <h2>Play Game</h2>;

function App() {
  return (
    <div className="App">
      <Button variant="outlined">
        Play
      </Button>
      <Home />
      <SetupGame />
      <PlayGame />
    </div>
  );
}

export default App;
