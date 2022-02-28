import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

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
            <Button
                variant='outlined'
                onClick={() => nav("/setup")}
            >
                Play
            </Button>
        </>
    );
};