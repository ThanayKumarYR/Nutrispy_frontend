import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { foods } from '../../utilities/nutrition'

export default function FormDialog(props) {

    function setFood(foodName) {
        console.log("set food")
        let found = false;
        foods.forEach(eachFood => {
            if (eachFood.name === foodName) {
                found = true;
                const defaultValues = {};
                Object.keys(eachFood).forEach(key => {
                    if (key !== "Name" && key !== "Calories") {
                        defaultValues[key] = eachFood[key];
                    }
                });
                props.setData({
                    "Food Type": eachFood["Food Type"],
                    "name": eachFood.name,
                    "quantity": 1,
                    "measurement": "pieces",
                    "calories": eachFood.calories ?? null,
                    ...defaultValues
                });
                console.log(defaultValues)
            }
        });
        if (!found) {
            props.setData({
                "name": foodName,
                "quantity": 1,
                // "measurement": "pieces",
                "calories": null,
            });
        }
    }


    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        console.log(formJson);
                        if (props.isNew) {
                            console.log(props.imagesAndDetails);
                            let tempList = props.imagesAndDetails;
                            tempList.push({
                                "index": tempList.length > 0 ? tempList[tempList.length - 1]["index"] + 1 : 0,
                                "img": "",
                                "details": {
                                    "food": "yes",
                                    "name": props.data.name,
                                    "nutrients": {
                                        ...props.data
                                    }
                                },
                            });
                            props.setCurrentPreview({
                                "index": tempList.length - 1,
                                "img": ""
                            })
                            props.setIsNew(false)
                            console.log(props.data)
                            console.log("is new and pushed");
                        }
                        else {
                            console.log("not new and updated");
                            props.setImagesAndDetails(
                                props.imagesAndDetails?.map(e =>
                                    e.index === props.data['index'] ? {
                                        ...e,
                                        details: {
                                            ...e.details,
                                            nutrients: {
                                                ...e.details.nutrients,
                                                ...formJson
                                            }
                                        }
                                    } : e
                                )
                            );
                            console.table(props.imagesAndDetails);
                        }
                        props.setData({})
                        props.handleClose();
                    },
                }}
            >
                <DialogTitle>Add Food</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        required
                        freeSolo
                        selectOnFocus
                        autoFocus
                        name="name"
                        sx={{ mt: 1 }}
                        value={props.data.name || ""}
                        options={foods.map((option) => option.name)}
                        // getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Food Name" value={props.data.name || ""} />}
                        onChange={(e, newValue) => {
                            setFood(newValue)
                        }}
                        onInputChange={(e, newInputValue) => {
                            props.setData(prevData => ({
                                "name": newInputValue,
                                "quantity": "",
                                "measurement": "",
                                "calories": "",
                                ...prevData
                            }));
                        }}
                    />
                    <Box
                        sx={{ mt: 2 }}>
                        <FormControl sx={{ mr: 2, minWidth: 115 }} required>
                            <InputLabel>Quantity</InputLabel>
                            <Select
                                value={props.data.quantity || ""}
                                onChange={(e) => {
                                    props.setData(prevData => ({
                                        ...prevData,
                                        [e.target.name]: e.target.value
                                    }))
                                }}
                                autoWidth
                                label="Quantity"
                                name="quantity"
                                required
                            >
                                <MenuItem sx={{ mx: 1 }} value={1}>1</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={2}>2</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={3}>3</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={4}>4</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={5}>5</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={6}>6</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={7}>7</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={8}>8</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={9}>9</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 150 }} required>
                            <InputLabel>Measurement</InputLabel>
                            <Select
                                value={props.data.measurement || ""}
                                onChange={(e) => {
                                    props.setData(prevData => ({
                                        ...prevData,
                                        [e.target.name]: e.target.value
                                    }))
                                }}
                                autoWidth
                                label="Measurement"
                                name="measurement"
                            >
                                <MenuItem sx={{ mx: 1 }} value={"bowl"}>bowl</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"gm"}>gm</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"spoon"}>spoon</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"plate"}>plate</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"piece"}>piece</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"glass"}>glass</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{ display: "flex", placeItems: "end" }}>
                        <TextField
                            sx={{ width: 75, mr: 1 }}
                            InputProps={{ inputProps: { min: 1 } }}
                            required
                            margin="dense"
                            name="calories"
                            label="Calories"
                            type="number"
                            variant="standard"
                            placeholder='100'
                            value={props.data.calories || ""}
                            onChange={(e) => {
                                props.setData(prevData => ({
                                    ...prevData,
                                    [e.target.name]: Number(e.target.value)
                                }))
                            }}
                        />
                        <Typography variant="body1" display="inline" gutterBottom>
                            cal / {props.data.measurement}
                        </Typography>
                    </Box>
                    <Box>
                        <span>{props.data["Food Type"] && `Food Type: ${props.data["Food Type"]}`}</span><br />
                        {
                            Object.entries(props.data).map(([key, value], index) => (
                                ["name", "index", "food", "quantity", "measurement", "calories"].includes(key.toLocaleLowerCase()) ? null :
                                    <span key={index}>

                                        {key === "nutrients" ?
                                            <span>
                                                {key.toLocaleLowerCase() === "nutrients" ? 'quantity' : null}: {value.quantity} {value.measurement}<br />
                                                {Object.entries(value).map(([nutrientKey, nutrientValue], nutrientIndex) => (
                                                    nutrientKey in ["name", "quantity", "measurement", "Food Type",] ? null :
                                                        <span key={nutrientIndex + index}>{nutrientKey} : {nutrientValue}<br /></span>
                                                ))}
                                            </span>
                                            :
                                            <span>{
                                                key === "Food Type"
                                                    ?
                                                    null
                                                    : <>{key[0].toUpperCase() + key.slice(1, key.length)}: {value}  <br /></>
                                            }</span>
                                        }
                                    </span>
                            ))
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    {props.imagesAndDetails.length !== 0 &&
                        <Button onClick={props.handleClose} color='error'>Cancel</Button>
                    }
                    <Button type="submit" color="success" variant='contained'>Okay</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}