import React, { useState } from 'react'

import nutrition from "./utilities/nutrition.json"
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Banner from './images/food-bg.png'

import './Playground.css'

export default function Playground() {

    const [imageCache, setImageCache] = useState({});
    // eslint-disable-next-line
    const [foodRecommends, setFoodRecommends] = useState(nutrition.map((e, index) => (
        {
            index,
            imageUrl: "",
            ...e,
        }
    )))
    // eslint-disable-next-line
    async function getFoodImages(foodName, index) {
        if (imageCache[index]) {
            return Promise.resolve(imageCache[index]);
        }

        return axios.get(
            `https://api.unsplash.com/search/photos?query=${foodName}&per_page=1&client_id=HXGD1C04FfGYVQMM6Z9029JOPtjSqYIAuYeeaeFaczU`
        ).then(res => {
            const imageUrl = res.data.results[0].urls.raw;
            setImageCache(prevCache => ({
                ...prevCache,
                [index]: imageUrl
            }));
            return imageUrl;
        }).catch(err => {
            console.error("Error fetching image:", err);
            return null;
        });
    }

    // useEffect(() => {
    //     foodRecommends.forEach((food, index) => {
    //         getFoodImages(food.Name, index)
    //             .then(imageUrl => {
    //                 if (imageUrl) {
    //                     setFoodRecommends(prevFoodRecommends => {
    //                         const updatedFoodRecommends = [...prevFoodRecommends];
    //                         updatedFoodRecommends[index] = { ...food, imageUrl };
    //                         return updatedFoodRecommends;
    //                     });
    //                 }
    //             });
    //     });
    //     console.log("inside useeffect")
    // }, []);

    const [filter, setFilter] = useState({
        foodType: "All",
        sortBy: ""
    })

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


    return (
        <div className="playground">
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
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Indian">Indian Food</MenuItem>
                        <MenuItem value="Chinese">Chinese Food</MenuItem>
                        <MenuItem value="Fruits and Vegetables">Fruits and Vegetables</MenuItem>
                        <MenuItem value="Other">Others</MenuItem>
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
                        <MenuItem value={null}>Clear</MenuItem>
                        <MenuItem value="Calories">Calories</MenuItem>
                        <MenuItem value="protien">Protien</MenuItem>
                        <MenuItem value="Fat">Fat</MenuItem>
                    </Select>
                </FormControl>
                <section className="exercises-cards">
                    {foodRecommends.length &&
                        filteredSortedFoods.map((food, index) => <div className="each-card" key={index}>
                            <div className='content'>
                                <p className='name'>{food.Name}</p>
                                <p className='body'>{food.Calories} cal</p>
                                <p className='body'>{food.Fat}gm Fat</p>
                            </div>
                            <img loading="lazy" src={food.imageUrl || Banner} alt="" />
                            <input type="checkbox" name="exercise" />
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="#4a1d1d"
                                        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                                </svg>
                            </span>
                        </div>)}
                </section>
            </section>
        </div>
    )
}
