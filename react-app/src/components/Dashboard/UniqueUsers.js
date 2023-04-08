import React, { useState, useEffect } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import axios from '../../api/axios'

function UniqueUsers() {
  const [uniqueUsers, setUniqueUsers] = useState(false);
  useEffect(() => {
    let now = new Date();
    let currentHour = now.getHours();
    axios.get(`/uniqueUsers/${currentHour}`, { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setUniqueUsers(res.data);
      })

  }, [])
  return (
    <>
      {uniqueUsers &&
        <AreaChart width={550} height={250} data={uniqueUsers}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="_id" />
          <YAxis allowDecimals={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="count" name="users" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      }
    </>
  )
}

export default UniqueUsers