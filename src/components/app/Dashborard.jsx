import React, { useState } from 'react'

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { LoadingButton } from '@mui/lab';

import './css/Dashboard.css'
import { Box, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { MdFoodBank } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { BarChart } from '@mui/x-charts';

export default function Dashborard({ logout, userPoints }) {

    document.title = "NutriSpy - Dashboard"

    const [loading, setLoading] = useState(false)
    const [chartType, setChartType] = useState(0)

    const foodScore = 100 * userPoints.currentScore / userPoints.goalScore;

    // const foodData = [
    //     { value: 30, label: 'Carbohydrates' },
    //     { value: 15, label: 'Protiens' },
    //     { value: 10, label: 'Fat' },
    //     { value: 10, label: 'Others' },
    // ];
    // const exerciseData = [
    //     { value: 6, label: 'Others' },
    //     { value: 8, label: 'Weight Lifting' },
    //     { value: 12, label: 'Jogging' },
    //     { value: 20, label: 'Push Ups' },
    // ];

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
            <Box sx={{ width: 100 }}>
                <InputLabel id="chart-type">Chart Type</InputLabel>
                <Select
                    fullWidth
                    labelId="chart-type"
                    value={chartType}
                    label="Chart Type"
                    defaultValue='All'
                    onChange={(e) => {
                        setChartType(e.target.value)
                    }}
                >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                </Select>
            </Box>

            {/* <Box className="pie-chart" display="flex" flexWrap="wrap" alignItems="center" justifyContent="center"  >
                <PieChart
                    className='chart'
                    hideTooltip
                    slotProps={{ legend: { hidden: true } }}
                    series={[
                        {
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle: 45,
                            data: foodData,
                            innerRadius: 0,
                            outerRadius: 120,
                            paddingAngle: 0,
                            cornerRadius: 4,
                            startAngle: 0,
                            cx: 60,
                            cy: 140,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                        },
                    }}
                    height={300}
                    width={140}
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
                            innerRadius: 0,
                            outerRadius: 120,
                            paddingAngle: 0,
                            cornerRadius: 4,
                            startAngle: 0,
                            cx: 60,
                            cy: 140,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                        },
                    }}
                    height={300}
                    width={140}
                />
            </Box>
            <Box>
                <BarChart
                    series={[
                        { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
                        { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
                        { data: [14, 6, 5, 8, 9], label: 'Series B1' },
                    ]}
                    barLabel={(item, context) => {
                        if ((item.value ?? 0) > 10) {
                            return 'High';
                        }
                        return context.bar.height < 60 ? null : item.value?.toString();
                    }}
                    width={700}
                    height={350}
                />
                <BarChart
                    series={[
                        { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
                        { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
                        { data: [14, 6, 5, 8, 9], label: 'Series B1' },
                    ]}
                    barLabel={(item, context) => {
                        if ((item.value ?? 0) > 10) {
                            return 'High';
                        }
                        return context.bar.height < 60 ? null : item.value?.toString();
                    }}
                    width={600}
                    height={350}
                />
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={500}
                    height={300}
                    barLabel="value"
                />
            </Box> */}
            <Box>
                {charts[chartType]}
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

const charts = [
    <PieChart
        className='chart'
        hideTooltip
        // slotProps={{ legend: { hidden: true } }}
        series={[
            {
                // arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 35,
                data: [{ value: 30, label: 'Carbohydrates' },
                { value: 15, label: 'Protiens' },
                { value: 10, label: 'Fat' },
                { value: 10, label: 'Others' }],
            },
        ]}
        sx={{
            [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white'
            },
        }}
        height={200}
        width={380}
    />,

    <PieChart
        className='chart'
        hideTooltip
        // slotProps={{ legend: { hidden: true } }}
        series={[
            {
                // arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data: [{ value: 6, label: 'Others' },
                { value: 8, label: 'Weight Lifting' },
                { value: 12, label: 'Jogging' },
                { value: 20, label: 'Push Ups' }],
            },
        ]}
        sx={{
            [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                // fontWeight: 'bold',
            },
        }}
        height={200}
        width={380}
    />,


    <BarChart
        series={[
            { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
            { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
            { data: [14, 6, 5, 8, 9], label: 'Series B1' },
        ]}
        barLabel={(item, context) => {
            if ((item.value ?? 0) > 10) {
                return 'High';
            }
            return context.bar.height < 60 ? null : item.value?.toString();
        }}
        width={380}
        height={350}
    />,

    <BarChart
        series={[
            { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
            { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
            { data: [14, 6, 5, 8, 9], label: 'Series B1' },
        ]}
        barLabel={(item, context) => {
            if ((item.value ?? 0) > 10) {
                return 'High';
            }
            return context.bar.height < 60 ? null : item.value?.toString();
        }}
        width={380}
        height={350}
    />,

    <BarChart
        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={380}
        height={300}
        barLabel="value"
    />

]