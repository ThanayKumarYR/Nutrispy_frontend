import React, { useState } from 'react'

import { PieChart } from '@mui/x-charts/PieChart';
import { LoadingButton } from '@mui/lab';

import './css/Dashboard.css'

export default function Dashborard({ logout, userPoints }) {

    document.title = "NutriSpy - Dashboard"

    const [loading, setLoading] = useState(false)

    const foodScore = 100 * userPoints.currentScore / userPoints.goalScore;

    return (
        <main className='dashboard'>
            <center>Dashborard</center>
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
            {String(JSON.stringify(loading))}
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
