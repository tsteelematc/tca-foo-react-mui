import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SetupGame = ({
    uniquePreviousPlayers
    , setCurrentGame
}) => {

    const nav = useNavigate();

    const playersWithCheckedProperty = uniquePreviousPlayers.map(x => ({
        name: x
        , checked: false
    }));

    const [availablePlayers, setAvailablePlayers] = useState(playersWithCheckedProperty);
    const [newPlayerName, setNewPlayerName] = useState("");

    const startGame = () => {
        
        // Set data for the current game...
        setCurrentGame({
            players: availablePlayers.filter(x => x.checked).map(x => x.name)
            , start: (new Date()).toISOString()
        });

        // Nav to the play game screen.
        nav("/play");
    };

    const toggleCheckbox = (p) => {
        setAvailablePlayers(
            availablePlayers.map(x=> ({
                ...x
                , checked: x === p ? !x.checked : x.checked
            }))
        );
    };

    const addNewAvailablePlayer = () => {

        // Add a new available player.
        setAvailablePlayers(
            [
                ...availablePlayers
                , {
                    name: newPlayerName
                    , checked: true
                }
            ]
        );

        // Clear out the text field.
        setNewPlayerName("");
    };

    return (
        <>
            <h2>
                Setup Game
            </h2>

            <h3>
                Choose Players
            </h3>
            <div>
                <TextField
                    variant='outlined'
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                />
                <Button
                    variant="outlined"
                    onClick={addNewAvailablePlayer}
                >
                    Add
                </Button>
            </div>
            {
                availablePlayers.map(x => 
                    <p key={x.name}>
                        <FormControlLabel
                            label={x.name}
                            key={x.name}
                            control={
                                <Checkbox
                                    checked={x.checked}
                                    onChange={() => toggleCheckbox(x)}
                                />
                        }
                        />
                    </p>
                )
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