import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import MyNav from '../../components/MyNav';
import MyFooter from '../../components/MyFooter';
import './style.css';
import TopUsers from '../../components/Dashboard/TopUsers';
import ErrorsByEndpoint from '../../components/Dashboard/ErrorsByEndpoint';
import RecentErrors from '../../components/Dashboard/RecentErrors';
import UniqueUsers from '../../components/Dashboard/UniqueUsers';
import UsersByEndpoint from '../../components/Dashboard/UsersByEndpoint';


function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios.get('/getSessionInfo', { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if (res.data.isAdmin) setIsAdmin(true);
                else if (res.data.isLoggedIn) window.location.href = '/pokemons';
                else window.location.href = '/';
            })

    }, [])

    return (
        <>
            <MyNav isAdmin={isAdmin} />
            {isAdmin &&
                <div id='adminContainer'>
                    <div className='chartContainer'>
                        <h2 className='chartTitle'>Top 10 users</h2>
                        <TopUsers />   
                    </div>
                    <div className='chartContainer'>
                        <h2 className='chartTitle'>Unique users in the last 6hs</h2>
                        <UniqueUsers />
                    </div>
                    <div className='chartContainer'>
                        <h2 className='chartTitle'>Users by endpoint</h2>
                        <UsersByEndpoint />
                    </div>
                    <div className='chartContainer'>
                        <h2 className='chartTitle'>Errors by endpoint</h2>
                        <ErrorsByEndpoint />
                    </div>
                    <div className='chartContainer'>
                        <h2 className='chartTitle'>Recent Errors</h2>
                        <RecentErrors />
                    </div>
                </div>

            }
            <MyFooter />
        </>
    )
}

export default Admin;