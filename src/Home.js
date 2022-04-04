import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const calculateShortestGame = (results) => (
    Math.min(
        ...results.map(x => Date.parse(x.end) - Date.parse(x.start))
    )
);

const calculateLeaderboard = (uniquePlayers, results) => {

    return uniquePlayers.map(x => {

        const userGamesPlayed = results.filter(y => y.players.some(z => z.name === x));
        const userGamesWon = userGamesPlayed.filter(y => y.winner === x);

        return {
            name: x
            , wins: userGamesWon.length
            , losses: userGamesPlayed.length - userGamesWon.length
            , winningPercent: (userGamesWon.length / userGamesPlayed.length).toFixed(3)
        };
    });

};

export const Home = ({
    gameResults
    , uniquePreviousPlayers
}) => {

    const nav = useNavigate();

    useEffect(
        () => {
            const lb = calculateLeaderboard(uniquePreviousPlayers, gameResults);
            console.log(lb);
        }
        , [uniquePreviousPlayers, gameResults]
    );


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