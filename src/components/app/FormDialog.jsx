import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

export default function FormDialog(props) {

    console.log(props.data);

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
                            console.log(props.foodList);
                            let tempList = props.foodList;
                            tempList.push({ "index": props.foodList.length > 0 ? props.foodList[props.foodList.length - 1]["index"] + 1 : 0, ...props.data });
                            props.setIsNew(false)
                            console.log("is new and pushed");
                        }
                        else {
                            console.log("not new and updated");
                            console.log(props.foodList);
                            props.setFoodList(
                                props.foodList.map(
                                    e => e.index === props.data['index'] ? { "index": props.data['index'], ...formJson } : e)
                            )
                        }
                        props.setData({})
                        props.handleClose();
                    },
                }}
            >
                <DialogTitle>Add Food</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        name="name"
                        label="Food Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={props.data.name || ""}
                        onChange={(e) => {
                            let inputValue = e.target.value
                            inputValue.replace(/[^0-9.]/g, '')
                            console.log(inputValue);
                            props.setData(prevData => ({
                                ...prevData,
                                [e.target.name]: inputValue
                            }))
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
                                <MenuItem sx={{ mx: 1 }} value={"pieces"}>pieces</MenuItem>
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
                                    [e.target.name]: e.target.value
                                }))
                            }}
                        />
                        <Typography variant="body1" display="inline" gutterBottom>
                            Cal
                        </Typography>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='error'>Cancel</Button>
                    <Button type="submit" color="success" variant='contained'>Okay</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}