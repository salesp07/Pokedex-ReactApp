import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

function RecentErrors() {
    const [recentErrors, setRecentErrors] = useState(false);
    useEffect(() => {
        axios.get('/recentErrors', { withCredentials: true })
            .then(res => {
                setRecentErrors(res.data);
            })
    }, [])

    function getBgColor(str) {
        const bgs ={
            GET: 'primary',
            POST: 'success',
            PATCH: 'secondary',
            DELETE: 'danger'
        }
        return bgs[str];
    }

    function getActualDate(date) {
        const offSet = date.getTimezoneOffset() * 60 * 1000;
        const tLocalISO = new Date(date - offSet).toISOString().slice(0,16).replace('T', ' ');
        return tLocalISO;
    }

    return (
        <>
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
                                <br />
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
        </>
    )
}

export default RecentErrors