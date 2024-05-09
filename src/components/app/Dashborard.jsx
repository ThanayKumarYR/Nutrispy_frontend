import React, { useState } from 'react'

import { PieChart } from '@mui/x-charts/PieChart';
import { LoadingButton } from '@mui/lab';

export default function Dashborard({ logout }) {

    document.title = "NutriSpy - Dashboard"

    const [loading, setLoading] = useState(false)

    const foodScore = 85;

    return (
        <main className='dashboard'>
            <center>Dashborard</center>
            <PieChart
                height={80}
                width={80}
                slotProps={{ legend: { hidden: true } }}
                hideTooltip
                series={[
                    {
                        data: [
                            { id: 0, value: foodScore, label: 'Food Calories' }
                        ],
                        innerRadius: 25,
                        outerRadius: 30,
                        paddingAngle: 4,
                        cornerRadius: 4,
                        startAngle: 0,
                        endAngle: (360 * foodScore) / 100,
                        cx: 40,
                        cy: 40,
                    }
                ]}
            />
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
