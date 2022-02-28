import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const PlayGame = () => {

    const nav = useNavigate();

    return (
        <>
            <h2>
                Play Game
            </h2>
            <Button
                variant='outlined'
                onClick={() => nav("/")}
            >
                Done
            </Button>
        </>
    );
};