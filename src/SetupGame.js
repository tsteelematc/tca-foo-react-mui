import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SetupGame = ({
    uniquePreviousPlayers
    , setCurrentGame
}) => {

    const nav = useNavigate();

    const startGame = () => {
        
        // Set data for the current game...
        setCurrentGame({
            players: choosePlayers.filter(x => x.checked).map(x => x.name)
            , start: (new Date()).toISOString()
        });

        // Nav to the play game screen.
        nav("/play");
    };

    const playersWithCheckedState = uniquePreviousPlayers.map(x => ({
        name: x
        , checked: false
    }));

    const [choosePlayers, setChoosePlayers] = useState(playersWithCheckedState);

    const togglePlayerCheck = (p) => {
        setChoosePlayers(choosePlayers.map(x => ({
            ...x
            , checked: x === p ? !x.checked : x.checked
        })));
    };

    const [newPlayerName, setNewPlayerName] = useState("");

    const addNewPlayer = () => {
        setChoosePlayers([
            ...choosePlayers
            , {
                name: newPlayerName
                , checked: true
            }
        ]);
        setNewPlayerName("");
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
            <div>
                <TextField 
                    variant="outlined"
                    label="Enter new player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                />
                <Button
                    onClick={addNewPlayer}
                >
                    Add
                </Button>
            </div>
            {
                choosePlayers.map(x => (
                    <p>
                        <FormControlLabel
                            key={x.name}
                            label={x.name}
                            control={(
                                <Checkbox 
                                    checked={x.checked}
                                    onChange={() => togglePlayerCheck(x)}
                                />
                            )}
                        />
                    </p>                        
                ))
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