import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PlayGame = ({
    addGameResult
    , currentGame
}) => {

    const nav = useNavigate();

    // let hasHappened = false;
    const [hH, sHH] = useState(false);
    console.log(hH);
    
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
            <p>
                <FormControlLabel
                    label="Has Happened"
                    control={
                        <Checkbox
                            checked={hH}
                            onChange={(e) =>{
                                sHH(e.target.checked);
                                console.log(hH);
                            }}
                        />
                    }
                />
            </p>
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