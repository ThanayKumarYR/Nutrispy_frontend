import React, { useState } from 'react'
import AddFood from './AddFood'
import { Route, Routes } from 'react-router-dom'
import './css/Food.css'
import { PieChart } from '@mui/x-charts'

import Banner from '../../images/food-bg.png'

export default function Diet() {
    return (
        <main className="food-app">
            <Routes>
                <Route path="/add" element={<AddFood />} />
                <Route path="/*" element={<MainFood />} />
            </Routes>
        </main>
    )
}

function MainFood() {

    const goalScore = 4000;
    const currentScore = 3400;

    const foodScore = 100 * currentScore / goalScore;

    // eslint-disable-next-line
    const [foodRecomends, setFoodRecomends] = useState([{
        "index": 1,
        "name": "Chapthi",
        "quantity": 1,
        "measurement": "pieces",
        "calories": 300
    },
    {
        "index": 2,
        "name": "Rice",
        "quantity": 1,
        "measurement": "bowl",
        "calories": 400
    },
    {
        "index": 3,
        "name": "Panner Butter Masala",
        "quantity": 1,
        "measurement": "bowl",
        "calories": 900
    },
    {
        "index": 4,
        "name": "Butter Naan",
        "quantity": 1,
        "measurement": "pieces",
        "calories": 500
    },
    {
        "index": 5,
        "name": "Curd Rice",
        "quantity": 1,
        "measurement": "plate",
        "calories": 80
    },
    {
        "index": 6,
        "name": "Water",
        "quantity": 2,
        "measurement": "glass",
        "calories": 400
    },
    ])

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
                    <p className='score'>{currentScore} / {goalScore} K Cal</p>
                    <p className='message'>Good</p>
                </div>
            </section>
            <section>
                <h2>Recommended Foods</h2>
                <section class="exercises-cards">
                    {foodRecomends.length && foodRecomends.map(food => <div class="each-card">
                        <div className='content'>
                            <p className='name'>{food.name}</p>
                            <p className='body'>{food.calories} cal</p>
                        </div>
                        <img src={food.imageUrl || Banner} alt="" />
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
        </main>
    )
}
