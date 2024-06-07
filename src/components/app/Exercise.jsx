import React, { useEffect, useState } from 'react'

import exercises from '../../utilities/exercise';

import InfoIcon from '@mui/icons-material/Info';

import ExerciseBanner from '../../images/exercise.jpg'

import './css/Exercise.css'
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import axios from 'axios';
import recomFoods from '../../utilities/nutrition';

export default function Exercise() {

    const [exercisesWithIndex, setExercisesWithIndex] = useState(exercises.map((e, index) => (
        {
            index,
            imageUrl: "",
            ...e,
        }
    )))

    const [infoOpen, setInfoOpen] = useState(false)
    const [exerciseInfo, setexerciseInfo] = useState({})

    const [filter, setFilter] = useState({
        exerciseType: "All",
        sortBy: ""
    })

    const [selectRecomFoods, setSelectRecomFoods] = useState([])

    function handleSelectFoods(index, e) {
        if (e.target.checked) {
            setSelectRecomFoods(prevFoods => {
                const prev = [...prevFoods];
                if (!prev.includes(index))
                    prev.push(index)
                return prev;
            })
        } else {
            setSelectRecomFoods(prevFoods => {
                const prev = [...prevFoods];
                const ind = prev.indexOf(index)
                prev.splice(ind, 1)
                return prev;
            })
        }
        console.log(selectRecomFoods)
    }

    const filteredSortedExercises = filter.sortBy ?
        exercisesWithIndex.filter(food => (filter.exerciseType === "All") ? true : food["Food Type"] === filter.exerciseType)
            .sort((a, b) => {
                if (filter.sortBy === "Name") {
                    return a.Name.localeCompare(b.Name);
                } else if (b[filter.sortBy] === a[filter.sortBy]) {
                    return 0;
                } else if (filter.sortBy === "fat") {
                    return Number.parseFloat(a[filter.sortBy]) - Number.parseFloat(b[filter.sortBy]);
                }
                return Number.parseFloat(b[filter.sortBy]) - Number.parseFloat(a[filter.sortBy]);
            })
        :
        exercisesWithIndex.filter(food => (filter.exerciseType === "All") ? true : food["Food Type"] === filter.exerciseType)


    function getCount(filt) {
        if (filt === "") {
            return exercises.length;
        } else if (filt === undefined) {
            return exercises.filter(item => !item.hasOwnProperty("Benefited Body Part")).length;
        } else {
            return exercises.filter(item => item.hasOwnProperty("Benefited Body Part") && item["Benefited Body Part"] === filt).length;
        }
    }

    const exerciseTypes = [];

    exercises.forEach(item => {
        if (!exerciseTypes.includes(item["Benefited Body Part"])) {
            exerciseTypes.push(item["Benefited Body Part"]);
        }
    });
    exerciseTypes.sort()

    async function getFoodImages(foodName) {
        return axios.get(
            `https://api.unsplash.com/search/photos?query=${foodName}&per_page=1&client_id=Gv5TXOSqs2C866bGU_Ii48g2zd_lVf_jFcVz7_147mA`
        );
    }

    useEffect(() => {
        exercises.forEach((food, index) => {
            getFoodImages(food.Name)
                .then(res => {
                    const imageUrl = res.data.results[0].urls.raw;
                    exercisesWithIndex(prevFoodRecommends => {
                        const updatedFoodRecommends = [...prevFoodRecommends];
                        // updatedFoodRecommends[index] = { ...food, imageUrl };
                        return updatedFoodRecommends;
                    });
                })
                .catch(err => console.log(err));
        });
        // eslint-disable-next-line
    }, []);

    return (
        <main className='exercise-main'>
            <h2 className="heading">Add Exercise</h2>
            <Box sx={{ display: "flex", placeItems: "center" }}>
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel id="food-type">BodyPart </InputLabel>
                    <Select
                        labelId="food-type"
                        id="demo-simple-select"
                        value={filter.exerciseType}
                        label="BodyPart"
                        defaultValue='All'
                        onChange={(e) => {
                            setFilter(prev => ({
                                ...prev,
                                exerciseType: e.target.value
                            }))
                        }}
                    >
                        <MenuItem value="All">All ({getCount("")})</MenuItem>
                        {
                            exerciseTypes.map((eachType, index) => <MenuItem value={eachType} key={index}>{eachType || "Others"} ({getCount(eachType)})</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 100, ml: 2 }}>
                    <InputLabel id="sort-by">Sort By</InputLabel>
                    <Select
                        labelId="sort-by"
                        id="demo-simple-select"
                        value={filter.sortBy}
                        label="Sort By"
                        onChange={(e) => {
                            setFilter(prev => ({
                                ...prev,
                                sortBy: e.target.value
                            }))
                        }}
                    >
                        <MenuItem value={""}>Clear</MenuItem>
                        <MenuItem value="Name">Name</MenuItem>
                        <MenuItem value="Duration">Duration</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 100, display: "grid", placeItems: "center" }}>
                    <Button variant="outlined" color="error" onClick={() => setFilter({ exerciseType: "All", sortBy: "" })}>Reset</Button>
                </FormControl>
            </Box>
            {/* {JSON.stringify(selectRecomFoods.length > 0 ?
                exercises
                    .filter(food => selectRecomFoods.includes(recomFoods.indexOf(food)))
                    .map((food, index) => {
                        const details = {
                            food: "yes",
                            name: food.name,
                            nutrients: {
                                name: food.name,
                                quantity: 1,
                                measurement: "bowl",
                                ...food
                            }
                        };
                        return {
                            index,
                            img: "",
                            details
                        };
                    })
                : [])} */}
            {/* {JSON.stringify(selectRecomFoods.length > 0 ? exercises[] : [])} */}
            <section className="exercises-cards">
                {exercisesWithIndex.length &&
                    filteredSortedExercises.map((food, index) => <div className="each-card" key={index}>
                        <div className='content'>
                            <p className='name'>{food.Name}</p>
                            <p className='body'>{food['Calories Burnt']} cal</p>
                            <p className='body'>{food['Duration']}</p>
                        </div>
                        <button className='info' variant='contained' onClick={() => { setInfoOpen(true); setexerciseInfo(food) }}><InfoIcon /></button>
                        <img loading="lazy" src={food.imageUrl || ExerciseBanner} alt="" />
                        <input
                            type="checkbox"
                            name="exercise"
                            onChange={e => handleSelectFoods(food.index, e)}
                            checked={(selectRecomFoods?.length && selectRecomFoods.includes(food.index)) || false}
                        />                            <span className='checkmark'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="#4a1d1d"
                                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                        </span>
                    </div>)}
            </section>
            <InfoDialog
                infoOpen={infoOpen}
                setInfoOpen={setInfoOpen}
                exerciseInfo={exerciseInfo}
            />
        </main>
    )
}

function InfoDialog({ infoOpen, setInfoOpen, exerciseInfo }) {
    return (
        <Dialog
            open={infoOpen}
            onClose={() => setInfoOpen(false)}
            className='food-info'
        >
            <DialogTitle className='food-info-title'>
                {exerciseInfo["Name"]}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setInfoOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <DialogContentText >
                    <p >Calories Burnt: {exerciseInfo["Calories Burnt"]} cal</p>
                    <p >Description: {exerciseInfo["Description"]}</p>
                    <p >Timings: {exerciseInfo["Timings"]}</p>
                    <p >Duration: {exerciseInfo.Duration}</p>
                    <p >Benefited Body Part: {exerciseInfo["Benefited Body Part"]}</p>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}