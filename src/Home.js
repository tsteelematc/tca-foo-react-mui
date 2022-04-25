import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import prettyMs from 'pretty-ms';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const calculateShortestGame = (results) => (
    Math.min(
        ...results.map(x => Date.parse(x.end) - Date.parse(x.start))
    )
);

const calculateLeaderboard = (uniquePlayers, results) => {

    return uniquePlayers
        .map(x => {

            const userGamesPlayed = results.filter(y => y.players.some(z => z.name === x));
            const userGamesWon = userGamesPlayed.filter(y => y.winner === x);

            return {
                name: x
                , wins: userGamesWon.length
                , losses: userGamesPlayed.length - userGamesWon.length
                , winningPercent: (userGamesWon.length / userGamesPlayed.length).toFixed(3)
            };
        })
        .sort((a, b) => `${b.winningPercent}${(b.wins + b.losses).toString().padStart(3, '0')}`.localeCompare(`${a.winningPercent}${(a.wins + a.losses).toString().padStart(3, '0')}`))
    ;

};

export const Home = ({
    gameResults
    , uniquePreviousPlayers
    , emailAddress
    , updateEmailAddress
}) => {

    const nav = useNavigate();

    // Local, Home component, state, just to handle the TextField ! ! !
    const [emailForEditing, setEmailForEditing] = useState(emailAddress);

    const lb = calculateLeaderboard(uniquePreviousPlayers, gameResults);

    const shortestGame = calculateShortestGame(gameResults);

    return (
        <>
            <h2>
                Home
            </h2>
            {
                emailAddress.length > 0 ?
                <>
                    <h3>
                        {emailAddress}
                        <Button
                            onClick={() => updateEmailAddress("")}
                        >
                            Reset
                        </Button>
                    </h3>
                    <h3>
                        Total games played: {gameResults.length}
                    </h3>
                    <h3>
                        Shortest game: {prettyMs(10000)}
                    </h3>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">W</TableCell>
                                <TableCell align="right">L</TableCell>
                                <TableCell align="right">AVG</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lb.map((row) => (
                                <TableRow
                                    key={row.name}
                                >
                                    <TableCell align="right">{row.wins}</TableCell>
                                    <TableCell align="right">{row.losses}</TableCell>
                                    <TableCell align="right">{row.winningPercent}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        variant='outlined'
                        onClick={() => nav("/setup")}
                    >
                        Play
                    </Button>
                </>
                : 
                <>
                    <TextField 
                        placeholder="Enter email address"
                        value={emailForEditing}
                        onChange={(e) => setEmailForEditing(e.target.value)}
                    />
                    <Button
                        onClick={() => updateEmailAddress(emailForEditing)}
                    >
                        Save
                    </Button>
                </>
            }
        </>
    );
};