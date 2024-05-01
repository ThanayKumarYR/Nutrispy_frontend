import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';


export default function FormDialog(props) {

    function handleChange(e) {
        const { value, name } = e.target
        props.setData(prevData => ({
            ...prevData,
            [name]: value
        })
        )
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={props.handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        props.handleClose();
                    },
                }}
            >
                <DialogTitle>Add Food</DialogTitle>
                {JSON.stringify(props.data)}
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label={props.data["name"] ? "Food Name" : ""}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={props.data["name"]}
                        onChange={handleChange}
                    />
                    <Box
                        sx={{ mt: 1 }}>
                        <FormControl sx={{ mr: 2, minWidth: 115 }} required>
                            <InputLabel id="demo-simple-select-autowidth-label">Quantity</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={props.data["quantity"]}
                                onChange={handleChange}
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
                            <InputLabel id="demo-simple-select-autowidth-label">Measurement</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={props.data["measurement"]}
                                onChange={handleChange}
                                autoWidth
                                label="Measurement"
                                name="measurement"
                            >
                                <MenuItem sx={{ mx: 1 }} value={"bowl"}>bowl</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"gm"}>gm</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"spoon"}>spoon</MenuItem>
                                <MenuItem sx={{ mx: 1 }} value={"plate"}>plate</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{ display: "flex", placeItems: "end" }}>
                        <TextField
                            sx={{ width: 80, mr: 1 }}
                            autoFocus
                            required
                            margin="dense"
                            id="calories"
                            name="calories"
                            label={props.data["calories"] ? "Calories" : ""}
                            type="number"
                            variant="standard"
                            placeholder='100'
                            value={props.data["calories"]}
                            onChange={handleChange}
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
