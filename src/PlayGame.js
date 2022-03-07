import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const PlayGame = ({
    addGameResult
    , currentGame
}) => {

    const nav = useNavigate();

    const endGame = () => {

        addGameResult({
            start: currentGame.start
            , players: currentGame.players.map(x => ({
                name: x
                , order: 0
            }))
            , end: (new Date()).toISOString()
            , winner: "Suzzie"
        });

        nav("/");
    };

    return (
        <>
            <h2>
                Play Game
            </h2>
            <Button
                variant='outlined'
                onClick={endGame}
            >
                Done
            </Button>
        </>
    );
};