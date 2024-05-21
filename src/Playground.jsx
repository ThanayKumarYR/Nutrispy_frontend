import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import nutrition from "./utilities/nutrition.json"


export default function Playground() {

    const [foodName, setFoodName] = useState("")

    return (
        <div>
            <Autocomplete
                freeSolo
                selectOnFocus
                options={nutrition.map((option) => option.Name)}
                renderInput={(params) => <TextField {...params} label="Food Name" value={foodName} />}
                onChange={(event, newValue) => {
                    setFoodName(newValue)
                }}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            ads
            {foodName}
        </div>
    )
}
