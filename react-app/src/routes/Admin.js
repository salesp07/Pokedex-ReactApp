import React, {useState, useEffect} from 'react'
import axios from '../api/axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, PieChart, Pie } from 'recharts';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [topUsers, setTopUsers] = useState(false);
    const [uniqueUsers, setUniqueUsers] = useState(false);
    const [errorsByEndpoint, setErrorsByEndpoint] = useState(false);
    const [recentErrors, setRecentErrors] = useState(false);
    const [topUsersByEndpoint, setTopUsersByEndpoint] = useState(false);	

    function getActualDate(date) {
        const offSet = date.getTimezoneOffset() * 60 * 1000;
        const tLocalISO = new Date(date - offSet).toISOString().slice(0,16).replace('T', ' ');
        return tLocalISO;
    }

    async function getUsersByEndpoint(endpoint) {
        const res = await axios.get(`/topUsers/${endpoint}`, {withCredentials: true})
        setTopUsersByEndpoint(res.data);
    }

    function getBgColor(str) {
        const bgs ={
            GET: 'primary',
            POST: 'success',
            PATCH: 'secondary',
            DELETE: 'danger'
        }
        return bgs[str];
    }

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
        axios.get('/errorsByEndpoint', {withCredentials: true})
            .then(res => {
                const colors = ['#82ca9d', '#8884d8', '#ffc658', '#8dd1e1', '#ff7f0e'];
                const pieData = res.data.map((entry, index) => ({
                    ...entry,
                    fill: colors[index],
                }));
                setErrorsByEndpoint(pieData);
            })
        axios.get('/recentErrors', {withCredentials: true})
            .then(res => {
                setRecentErrors(res.data);
            })
        getUsersByEndpoint('GET')
    }, [])

  return (
    <>
    {isAdmin && 
        <div id='adminContainer'>
            {/* <h1>Top 10 Users</h1> */}
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
        {errorsByEndpoint &&
            <PieChart width={730} height={350}>
                {errorsByEndpoint.map((item, index) => (
                    <Pie key={index} data={errorsByEndpoint} dataKey="count" nameKey="_id"  label={({ _id }) => _id.slice(1)}/>
                ))}
                <Tooltip />
            </PieChart>
            }            
        <ListGroup as="ol" numbered className='reportList'>
            {recentErrors && recentErrors.map((item, index) => (
                <div key={index}>
                    <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.name}</div>
                            {item.endpoint.substring(0, item.endpoint.indexOf("["))}
                            <br/>
                            {getActualDate(new Date(item.createdAt))}
                        </div>
                        <Badge bg={getBgColor(item.endpoint.match(/\[(.*?)\]/)[1])} pill>
                            {item.endpoint.match(/\[(.*?)\]/)[1]}
                        </Badge>
                    </ListGroup.Item>
                </div>
            ))
            }
        </ListGroup>
        <div>
        <div id='badgeContainer'>
            <Badge bg="primary" className='badge' pill onClick={()=>getUsersByEndpoint('GET')}>GET</Badge>
            <Badge bg="success" className='badge' pill onClick={()=>getUsersByEndpoint('POST')}>POST</Badge>
            <Badge bg="secondary" className='badge' pill onClick={()=>getUsersByEndpoint('PATCH')}>PATCH</Badge>
            <Badge bg="danger" className='badge' pill onClick={()=>getUsersByEndpoint('DELETE')}>DELETE</Badge>
        </div>
        <ListGroup as="ol" numbered className='reportList'>
            {topUsersByEndpoint && topUsersByEndpoint.map((item, index) => (
                <div key={index}>
                    <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item._id}</div>
                            {item.count} Requests
                        </div>
                    </ListGroup.Item>
                </div>
            ))
            }
        </ListGroup></div>
    </div>
        
    }
    </>
  )
}

export default Admin;