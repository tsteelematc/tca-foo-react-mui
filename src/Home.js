import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const calculateShortestGame = (results) => (
    Math.min(
        ...results.map(x => Date.parse(x.end) - Date.parse(x.start))
    )
);

export const Home = ({gameResults}) => {

    const nav = useNavigate();

    return (
        <>
            <h2>
                Home
            </h2>
            <h3>
                Total games played: {gameResults.length}
            </h3>
            <h3>
                Shortest game (minutes): {calculateShortestGame(gameResults) / 1000 / 60}
            </h3>
            <Button
                variant='outlined'
                onClick={() => nav("/setup")}
            >
                Play
            </Button>
        </>
    );
};