import React, {useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import axios from '../../api/axios'


function TopUsers() {
    const [topUsers, setTopUsers] = useState(false);
    useEffect(() => {
        axios.get('/topUsers', {withCredentials: true})
            .then(res => {
                setTopUsers(res.data);
            })
    }, [])
  return (
    <>
        {topUsers &&
            <BarChart width={450} height={400} data={topUsers} layout="vertical" barSize={25}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis type="number" />
                <YAxis dataKey="_id" type="category" width={180}/>
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" name='requests'/>
          </BarChart>}
    </>
  )
}

export default TopUsers