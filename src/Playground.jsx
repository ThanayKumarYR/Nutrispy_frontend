import { useEffect, useState } from 'react'
import './Playground.css'
import customAxios from "./utilities/axios"
import { PieChart, pieArcLabelClasses } from '@mui/x-charts'

export default function Playground() {

    document.title = "NutriSpy - Play"

    const [data, setData] = useState([])
    const [data1, setData1] = useState([])

    useEffect(() => {
        customAxios.getting("/detect/data", undefined)
            .then(res => {
                const data = res.data.data;
                setData(data);

                let dataArray = [];
                data.forEach(item => {
                    dataArray = dataArray.concat(item.dataArray);
                });

                const totals = calculateTotals(dataArray);
                setData1(totals); // Update state with the total object
            })
            .catch(err => setData(err));
    }, []);

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

        // Iterate through each item in dataArray
        dataArray.forEach(item => {
            // Check if the item has nutrient information
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


    return (
        <>
            <pre className=''>
                {/* {JSON.stringify(data1.map((key, value) => ({ value: value, label: key })), null, 2)} */}
                {JSON.stringify(Object.entries(data1).map(([key, value]) => {
                    return { name: key, value: value }
                }).map((key, value) => ({ value: key.value, label: key.name })), null, 2)}
                {/* {data.length && JSON.stringify(
                    data.map(e => e)
                    , null, 2
                )} */}
            </pre >
            <PieChart
                className='chart'
                hideTooltip
                series={[
                    {
                        arcLabel: (item) => `${item.label} (${item.value})`,
                        arcLabelMinAngle: 30,
                        data:
                            Object.entries(data1).map(([key, value]) => {
                                return { name: key, value: value }
                            }).sort((a, b) => a['value'] - b['value']).map((key, value) => ({ value: (key.value / (Object.values(data1).reduce((acc, value) => acc + value, 0)) * 100).toFixed(2), label: key.name })),
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white'
                    },
                }}
                height={500}
                width={500}
            />
        </>
    )
}