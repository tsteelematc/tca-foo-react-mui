import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const PlayGame = ({
    addGameResult
    , currentGame
}) => {

    const nav = useNavigate();

    const endGame = (winner) => {

        addGameResult({
            start: currentGame.start
            , players: currentGame.players.map(x => ({
                name: x
                , order: 0
            }))
            , end: (new Date()).toISOString()
            , winner: winner
        });

        nav(-2);
    };

    return (
        <>
            <h2>
                Play Game
            </h2>
            { currentGame.players.map(x => (
                <Button
                    variant='outlined'
                    onClick={() => endGame(x)}
                >
                    {`${x} Won`}
                </Button>
            ))}
            <Button
                variant='outlined'
                onClick={() => nav(-2)}
            >
                Quit
            </Button>
        </>
    );
};