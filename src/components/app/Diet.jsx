import React, { useState } from 'react'
import AddFood from './AddFood'
import { Navigate, Route, Routes } from 'react-router-dom'
import './css/Food.css'

import MainFood from './MainFood'

export default function Diet({ userPoints }) {

    const [selectRecomFoods, setSelectRecomFoods] = useState([])

    return (
        <main className="food-app">
            <Routes>
                <Route path="/add" element={<AddFood selectRecomFoods={selectRecomFoods} setSelectRecomFoods={setSelectRecomFoods} />} />
                <Route path="/" element={<MainFood selectRecomFoods={selectRecomFoods} setSelectRecomFoods={setSelectRecomFoods} userPoints={userPoints} />} />
                <Route path="/*" element={<Navigate to="/app/diet" replace={true} />} />
            </Routes>
        </main>
    )
}
