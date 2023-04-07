import React, { useState, useEffect } from 'react'
import { Tooltip, PieChart, Pie } from 'recharts';
import axios from '../../api/axios'

function ErrorsByEndpoint() {
    const [errorsByEndpoint, setErrorsByEndpoint] = useState(false);
    useEffect(() => {
        axios.get('/errorsByEndpoint', { withCredentials: true })
            .then(res => {
                const colors = ['#82ca9d', '#8884d8', '#ffc658', '#8dd1e1', '#ff7f0e'];
                const pieData = res.data.map((entry, index) => ({
                    ...entry,
                    fill: colors[index],
                }));
                setErrorsByEndpoint(pieData);
            })
    }, [])
    return (
        <>
            {errorsByEndpoint &&
                <PieChart width={730} height={350}>
                    {errorsByEndpoint.map((item, index) => (
                        <Pie key={index} data={errorsByEndpoint} dataKey="count" nameKey="_id" label={({ _id }) => _id.slice(1)} />
                    ))}
                    <Tooltip />
                </PieChart>
            }
        </>
    )
}

export default ErrorsByEndpoint