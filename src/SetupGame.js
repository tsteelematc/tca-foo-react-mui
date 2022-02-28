import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const SetupGame = () => {

    const nav = useNavigate();

    return (
        <>
            <h2>
                Setup Game
            </h2>
            <Button
                variant='outlined'
                onClick={() => nav("/play")}
            >
                Start Playing
            </Button>
        </>
    );
};