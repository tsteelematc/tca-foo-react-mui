import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const SetupGame = ({
    uniquePreviousPlayers
    , setCurrentGame
}) => {

    const nav = useNavigate();

    const startGame = () => {
        
        // Set data for the current game...
        setCurrentGame({
            players: [
                uniquePreviousPlayers[0]
                , uniquePreviousPlayers[1]
                , "Suzzie"
            ]
            , start: (new Date()).toISOString()
        });

        // Nav to the play game screen.
        nav("/play");
    };

    console.log(uniquePreviousPlayers);
    return (
        <>
            <h2>
                Setup Game
            </h2>

            <h3>
                Choose Players
            </h3>
            {
                uniquePreviousPlayers.map(x => <p key={x}>{x}</p>)
            }

            <Button
                variant='outlined'
                onClick={startGame}
            >
                Start Playing
            </Button>
        </>
    );
};