import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const nav = useNavigate();

    return (
        <>
            <h2>
                Home
            </h2>
            <Button
                variant='outlined'
                onClick={() => nav("/setup")}
            >
                Play
            </Button>
        </>
    );
};