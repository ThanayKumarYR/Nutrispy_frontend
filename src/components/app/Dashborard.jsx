import React, { useState } from 'react'

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { LoadingButton } from '@mui/lab';

import './css/Dashboard.css'
import { Box, Typography } from '@mui/material';

import { MdFoodBank } from "react-icons/md";
import { CgGym } from "react-icons/cg";

export default function Dashborard({ logout, userPoints }) {

    document.title = "NutriSpy - Dashboard"

    const [loading, setLoading] = useState(false)

    const foodScore = 100 * userPoints.currentScore / userPoints.goalScore;

    const foodData = [
        { value: 30, label: 'Carbohydrates' },
        { value: 15, label: 'Protiens' },
        { value: 10, label: 'Fat' },
        { value: 10, label: 'Others' },
    ];
    const exerciseData = [
        { value: 6, label: 'Others' },
        { value: 8, label: 'Weight Lifting' },
        { value: 12, label: 'Jogging' },
        { value: 20, label: 'Push Ups' },
    ];

    return (
        <main className='dashboard'>
            <Box className="test" sx={{ m: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
                    Dashboard
                </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" justifyContent="center" margin={1}>
                <section className='food-div'>
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
                                    { id: 0, value: foodScore, label: 'Food Calories' }
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
                    <MdFoodBank className='dash-icon' />

                    <div className='dash-text'>
                        <Typography className='score' component="p" variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
                            {userPoints.currentScore} / {userPoints.goalScore} <span>K Cal</span>
                        </Typography>
                        <Typography className='message' component="p" variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
                            Good
                        </Typography>
                    </div>
                </section>
                <section className='exercise-div'>
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
                                    { id: 0, value: foodScore, label: 'Calories Burnt' }
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
                    <CgGym className='dash-icon' />
                    <div className='dash-text'>
                        <Typography className='score' component="p" variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
                            {userPoints.currentScore} / {userPoints.goalScore} <span>K Cal</span>
                        </Typography>
                        <Typography className='message' component="p" variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
                            Good
                        </Typography>
                    </div>
                </section>
            </Box>

            <Box border="1px solid red" className="pie-chart" display="flex" flexWrap="wrap" alignItems="center" justifyContent="center"  >
                <PieChart
                    className='chart'
                    hideTooltip
                    slotProps={{ legend: { hidden: true } }}
                    series={[
                        {
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle: 45,
                            data: foodData,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                        },
                    }}
                />
                <PieChart
                    className='chart'
                    hideTooltip
                    slotProps={{ legend: { hidden: true } }}
                    series={[
                        {
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle: 45,
                            data: exerciseData,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Box>
            <LoadingButton
                loading={loading}
                variant="contained"
                type="submit"
                onClick={() => logout(setLoading)}
            >
                Log Out
            </LoadingButton>
        </main>
    )
}
