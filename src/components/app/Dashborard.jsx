import React, { useEffect } from 'react'

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

import './css/Dashboard.css'
import { Box, Typography } from '@mui/material';

import { MdFoodBank } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { BarChart } from '@mui/x-charts';

import customAxios from '../../utilities/axios';

export default function Dashborard({ logout, userPoints, foodHistory, setFoodHistory }) {

    document.title = "NutriSpy - Dashboard"

    const foodScore = 100 * foodHistory['calories'] / userPoints[0].goalScore;
    const exerciseScore = 100 * userPoints[1].currentScore / userPoints[1].goalScore;

    function calculateTotals(dataArray) {
        let totals = {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
            fiber: 0,
            iron: 0,
            calcium: 0,
            potassium: 0,
            sodium: 0,
            cholesterol: 0,
            sugars: 0
        };

        dataArray.forEach(item => {
            if (item.hasOwnProperty('calories')) {
                totals.calories += parseInt(item.calories) || 0;
            }
            if (item.hasOwnProperty('protien')) {
                totals.protein += parseFloat(item.protien) || 0;
            }
            if (item.hasOwnProperty('carbohydrates')) {
                totals.carbohydrates += parseFloat(item.carbohydrates) || 0;
            }
            if (item.hasOwnProperty('fat')) {
                totals.fat += parseFloat(item.fat) || 0;
            }
            if (item.hasOwnProperty('fiber')) {
                totals.fiber += parseFloat(item.fiber) || 0;
            }
            if (item.hasOwnProperty('iron')) {
                totals.iron += parseFloat(item.iron) || 0;
            }
            if (item.hasOwnProperty('calcium')) {
                totals.calcium += parseFloat(item.calcium) || 0;
            }
            if (item.hasOwnProperty('potassium')) {
                totals.potassium += parseFloat(item.potassium) || 0;
            }
            if (item.hasOwnProperty('sodium')) {
                totals.sodium += parseFloat(item.sodium) || 0;
            }
            if (item.hasOwnProperty('cholestrol')) {
                totals.cholesterol += parseFloat(item.cholestrol) || 0;
            }
            if (item.hasOwnProperty('sugars')) {
                totals.sugars += parseFloat(item.sugars) || 0;
            }
        });

        return totals;
    }

    useEffect(() => {
        customAxios.getting("/detect/data", undefined)
            .then(res => {
                const data = res.data.data;
                setFoodHistory(data);

                if (data.length !== 0) {
                    let dataArray = [];
                    data.forEach(item => {
                        dataArray = dataArray.concat(item.dataArray);
                    });
                    const totals = calculateTotals(dataArray);
                    setFoodHistory(totals);
                }
            })
            .catch(err => setFoodHistory(err));
        // eslint-disable-next-line
    }, []);

    return (
        <main className='dashboard'>
            <Box className="test" sx={{ m: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
                    Dashboard
                </Typography>
            </Box>
            <center>(Weekly record)</center>
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
                            {foodHistory['calories'] ?? 0} / {userPoints[0].goalScore} <span>K Cal</span>
                        </Typography>
                        <Typography className='message' component="p" variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
                            {/* {foodHistory['calories'] ?? 0 / userPoints[0].goalScore > }Good */}
                        </Typography>
                    </div>
                </section>
                <section className='exercise-div'>
                    <PieChart
                        colors={['red', 'blue', 'green']}
                        className='chart'
                        height={70}
                        width={70}
                        slotProps={{ legend: { hidden: true } }}
                        hideTooltip
                        series={[
                            {
                                data: [
                                    { id: 0, value: exerciseScore, label: 'Calories Burnt' }
                                ],
                                innerRadius: 25,
                                outerRadius: 30,
                                paddingAngle: 2,
                                cornerRadius: 5,
                                startAngle: 0,
                                endAngle: (360 * exerciseScore) / 100,
                                cx: 30,
                                cy: 30,
                            }
                        ]}
                    />
                    <CgGym className='dash-icon' />
                    <div className='dash-text'>
                        <Typography className='score' component="p" variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
                            {userPoints[1].currentScore ?? 0} / {userPoints[1].goalScore} <span>K Cal</span>
                        </Typography>
                        <Typography className='message' component="p" variant="subtitle1" sx={{ fontWeight: 600, fontSize: 20 }}>
                            {/* Bad */}
                        </Typography>
                    </div>
                </section>
            </Box>
            {/* <pre>{JSON.stringify(foodHistory, null, 2)}</pre> */}
            <Box className="chart-container" >
                <Box sx={{ display: "grid", placeItems: "center", maxHeight: "420px", overflow: "hidden" }}>
                    <h3>Food:</h3>
                    {!foodHistory.length ? "No Data to display" : <PieChart
                        className='chart'
                        colors={[
                            "#ffd700",
                            "#ff00ff",
                            "#ff4500",
                            "#32cd32",
                            "#b800d8",
                            "#ff1493",
                            "#ffa500",
                            "#ff7f50",
                            "#00ff00",
                            "#2e96ff",
                            "#60009b",
                            "#2731c8"
                        ]}
                        hideTooltip
                        cx={80}
                        cy={20}
                        series={[
                            {
                                arcLabel: (item) => `${item.label} (${item.value})`,
                                arcLabelMinAngle: 30,
                                data:
                                    Object.entries(foodHistory).map(([key, value]) => {
                                        return { name: key, value: value }
                                    }).sort((a, b) => b['value'] - a['value']).map((key, value) => ({ value: key.name === "potassium" || key.name === "sodium" ? (key.value / 10).toFixed(2) : key.value.toFixed(2), label: key.name[0].toUpperCase() + key.name.slice(1, key.name.length) })),
                                innerRadius: 0,
                                outerRadius: 130,
                                paddingAngle: 1,
                                cornerRadius: 5,
                                cx: 150,
                                startAngle: 0,
                                endAngle: 360,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                // fill: 'white'
                                fontSize: "14px",
                                fontWeight: 600
                            },
                        }}
                        slotProps={{ legend: { position: { horizontal: "middle", vertical: "top" }, direction: "row" } }}
                        height={500}
                        width={350}
                    />}
                </Box>
                <hr style={{ width: "100%", height: "2px", background: "#000" }} />
                <Box sx={{ display: "grid", placeItems: "center", maxHeight: "420px", overflow: "hidden" }}>
                    <h3>Exercise:</h3>
                    {!foodHistory.length ? "No Data to display" : <PieChart
                        className='chart'
                        hideTooltip
                        cx={80}
                        cy={20}
                        series={[
                            {
                                arcLabel: (item) => `${item.label} (${item.value})`,
                                arcLabelMinAngle: 30,
                                data:
                                    Object.entries(foodHistory).map(([key, value]) => {
                                        return { name: key, value: value }
                                    }).sort((a, b) => a['value'] - b['value']).map((key, value) => ({ value: key.value.toFixed(2), label: key.name[0].toUpperCase() + key.name.slice(1, key.name.length) })),
                                innerRadius: 0,
                                outerRadius: 130,
                                paddingAngle: 1,
                                cornerRadius: 5,
                                cx: 150,
                                startAngle: 0,
                                endAngle: 360,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white'
                            },
                        }}
                        slotProps={{ legend: { position: { horizontal: "middle", vertical: "top" }, direction: "row" } }}
                        height={500}
                        width={350}

                    />
                    }
                </Box>
            </Box>
            {/* <LoadingButton
                loading={loading}
                variant="contained"
                type="submit"
                onClick={() => logout(setLoading)}
            >
                Log Out
            </LoadingButton> */}
        </main>
    )
}

// eslint-disable-next-line
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
        width={400}
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
            { data: [4, 2, 5, 4, 1], stack: 'A', label: ' A1' },
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
            { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Carbohydrates' },
            { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Protiens' },
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