import React, {useState, useEffect} from 'react'
import axios from '../api/axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [topUsers, setTopUsers] = useState(false);
    const [uniqueUsers, setUniqueUsers] = useState(false);

    useEffect(() => {
        axios.get('/isAdmin', {withCredentials: true})
            .then(res => {
                if (res.data.isAdmin) setIsAdmin(true);
                else if (res.data.isLoggedIn) window.location.href = '/pokemons';
                else window.location.href = '/';
            })
        axios.get('/topUsers', {withCredentials: true})
            .then(res => {
                setTopUsers(res.data);
            })
        axios.get('/uniqueUsers', {withCredentials: true})
            .then(res => {
                setUniqueUsers(res.data);
            })
    }, [])

  return (
    <>
    {isAdmin && 
        <div>
            <h1>Top 10 Users</h1>
        {topUsers &&
            <BarChart width={500} height={400} data={topUsers} layout="vertical" barSize={25} id='topUsers'>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis type="number" />
                <YAxis dataKey="_id" type="category" width={180}/>
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" name='requests'/>
          </BarChart>}
        {uniqueUsers &&
            <AreaChart width={730} height={250} data={uniqueUsers}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="_id" />
                <YAxis allowDecimals={false}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="count" name="users" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
            }
    </div>
        
    }
    </>
  )
}

export default Admin;