import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/Food.css'

import { PieChart } from '@mui/x-charts'
import LoginIcon from '@mui/icons-material/Login';

import Banner from '../../images/food-bg.png'
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

import { useTheme } from '@mui/material/styles';

import axios from 'axios'

import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import recomFoods from '../../utilities/nutrition'

export default function MainFood({ userPoints, selectRecomFoods, setSelectRecomFoods }) {

    const theme = useTheme();

    const [infoOpen, setInfoOpen] = useState(false)
    const [foodInfo, setFoodInfo] = useState({})

    const foodScore = 100 * userPoints.currentScore / userPoints.goalScore;

    // eslint-disable-next-line
    const [foodRecommends, setFoodRecommends] = useState(recomFoods.map((e, index) => (
        {
            index,
            imageUrl: "",
            ...e,
        }
    )))

    // function getFoodImages() {
    //     axios.get(
    //         "https://api.unsplash.com/search/photos?query=idli&per_page=1"
    //     ).then(res => console.log(res.data.results[0].urls.raw))
    //         .catch(err => console.log(err))
    // }

    // eslint-disable-next-line
    async function getFoodImages(foodName) {
        return axios.get(
            `https://api.unsplash.com/search/photos?query=${foodName}&per_page=1&client_id=HXGD1C04FfGYVQMM6Z9029JOPtjSqYIAuYeeaeFaczU`
        );
    }

    // useEffect(() => {
    //     foodRecommends.forEach((food, index) => {
    //         getFoodImages(food.name)
    //             .then(res => {
    //                 const imageUrl = res.data.results[0].urls.raw;
    //                 console.log({index}, {imageUrl})
    //                 setFoodRecommends(prevFoodRecommends => {
    //                     const updatedFoodRecommends = [...prevFoodRecommends];
    //                     updatedFoodRecommends[index] = { ...food, imageUrl };
    //                     return updatedFoodRecommends;
    //                 });
    //             })
    //             .catch(err => console.log(err));
    //     });
    //     // eslint-disable-next-line
    // }, []);

    const [filter, setFilter] = useState({
        foodType: "All",
        sortBy: ""
    })

    function getCount(filt) {
        if (filt === "") {
            return foodRecommends.length;
        } else if (filt === undefined) {
            return foodRecommends.filter(item => !item.hasOwnProperty("Food Type")).length;
        } else {
            return foodRecommends.filter(item => item.hasOwnProperty("Food Type") && item["Food Type"] === filt).length;
        }
    }

    const filteredSortedFoods = filter.sortBy ?
        foodRecommends.filter(food => (filter.foodType === "All") ? true : food["Food Type"] === filter.foodType).sort((a, b) => {
            if (b[filter.sortBy] === a[filter.sortBy]) {
                return 0;
            }
            else if (filter.sortBy === "Fat") {
                return a[filter.sortBy] - b[filter.sortBy];
            }
            return b[filter.sortBy] - a[filter.sortBy];
        })
        :
        foodRecommends.filter(food => (filter.foodType === "All") ? true : food["Food Type"] === filter.foodType)


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

    const foodTypes = [];

    foodRecommends.forEach(item => {
        if (!foodTypes.includes(item["Food Type"])) {
            foodTypes.push(item["Food Type"]);
        }
    });

    return (
        <main className='main-food'>
            <h2>Food</h2>
            <section className='food-dashboard'>
                <PieChart
                    colors={['green', 'blue', 'green']}
                    className='chart'
                    height={70}
                    width={70}
                    slotProps={{ legend: { hidden: true } }}
                    hideTooltip
                    series={[
                        {
                            data: [
                                { id: 0, value: foodScore, label: 'Food' }
                            ],
                            innerRadius: 25,
                            outerRadius: 30,
                            paddingAngle: 2,
                            cornerRadius: 5,
                            startAngle: 0,
                            endAngle: (360 * foodScore) / 100,
                            cx: 30,
                            cy: 30,
                        }
                    ]}
                />
                <div className='dash-text'>
                    <p className='score'>{userPoints.currentScore} / {userPoints.goalScore} K Cal</p>
                    <p className='message'>Good</p>
                </div>
            </section>
            <section className='add-link'>
                <Link to="/app/diet/add">
                    <Button variant='contained'>
                        Add Food
                        <LoginIcon />
                    </Button>
                </Link>
            </section>
            <section>
                <h2>Recommended Foods</h2>
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel id="food-type">Food Type</InputLabel>
                    <Select
                        labelId="food-type"
                        id="demo-simple-select"
                        value={filter.foodType}
                        label="Food Type"
                        defaultValue='All'
                        onChange={(e) => {
                            setFilter(prev => ({
                                ...prev,
                                foodType: e.target.value
                            }))
                        }}
                    >
                        <MenuItem value="All">All ({getCount("")})</MenuItem>
                        {
                            foodTypes.map(eachType => <MenuItem value={eachType}>{eachType} ({getCount(eachType)})</MenuItem>)
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
                        <MenuItem value="calories">Calories</MenuItem>
                        <MenuItem value="protien">Protien</MenuItem>
                        <MenuItem value="fat">Fat</MenuItem>
                    </Select>
                </FormControl>
                <section className="exercises-cards">
                    {foodRecommends.length &&
                        filteredSortedFoods.map((food, index) => <div className="each-card" key={index}>
                            <div className='content'>
                                <p className='name'>{food.name}</p>
                                <p className='body'>{food.calories} cal</p>
                                <p className='body'>{food.fat} {String(food.fat).includes("g") ? "" : "gm"} Fat</p>
                            </div>
                            <button className='info' variant='contained' onClick={() => { setInfoOpen(true); setFoodInfo(food) }}><InfoIcon /></button>
                            <img loading="lazy" src={food.imageUrl || Banner} alt="" />
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
            </section>
            <Box display="flex" flexWrap="wrap" gap="10px 20px" className="selected-food">
                {selectRecomFoods.length > 0 ? <>{foodRecommends.filter(e => selectRecomFoods.includes(e.index)).map(eachFood =>
                    <React.Fragment key={eachFood.index}>
                        <Box
                            maxWidth={200}
                            bgcolor={theme => theme.palette.primary.light}
                            sx={{ px: 1, py: 1, borderRadius: 2, textAlign: "center", fontSize: 18, display: "flex", placeItems: "center" }}
                        >
                            {(eachFood.name)}
                            <button
                                className='delete-btn'
                                onClick={e => {
                                    setSelectRecomFoods(prevFoods => {
                                        const prev = [...prevFoods];
                                        const ind = prev.indexOf(eachFood.index)
                                        prev.splice(ind, 1)
                                        return prev;
                                    })
                                }}
                            >
                                <DeleteIcon style={{ color: theme.palette.warning.sec }} />
                            </button>
                        </Box>
                    </React.Fragment>
                )}
                    <Link to="/app/diet/add">
                        <Button variant='contained'>Add to Diet &nbsp;<SendIcon /></Button>
                    </Link>
                </> : null}
            </Box>
            <InfoDialog
                infoOpen={infoOpen}
                setInfoOpen={setInfoOpen}
                foodInfo={foodInfo}
            />
        </main >
    )
}


function InfoDialog({ infoOpen, setInfoOpen, foodInfo }) {
    return (
        <Dialog
            open={infoOpen}
            onClose={() => setInfoOpen(false)}
            className='food-info'
        >
            <DialogTitle className='food-info-title'>
                {foodInfo["name"]}
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
                    {foodInfo["Food Type"] ? <>Food Type: {foodInfo["Food Type"]}<br /></> : null}
                    {
                        Object.entries(foodInfo).map(([key, value], index) => (
                            ["name", "index", "food", "imageUrl", "Food Type"].includes(key) ? null :
                                <span key={index}>
                                    {value["Food Type"] ? <>Food Type: {value["Food Type"]}<br /></> : null}
                                    {key === "nutrients" ?
                                        <span>
                                            {key === "nutrients" ? 'quantity' : null}: {value.quantity} {value.measurement}<br />
                                            {Object.entries(value).map(([nutrientKey, nutrientValue], nutrientIndex) => (
                                                nutrientKey === "name" || nutrientKey === "quantity" || nutrientKey === "measurement" ? null :
                                                    <span key={nutrientIndex}>{nutrientKey}: {nutrientValue}<br /></span>
                                            ))}
                                        </span>
                                        :
                                        <span>{key[0].toUpperCase() + key.slice(1, key.length)}: {value}<br /></span>
                                    }
                                </span>
                        ))
                    }
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}