import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function UsersByEndpoint() {
  const [topUsersByEndpoint, setTopUsersByEndpoint] = useState(false);
  async function getUsersByEndpoint(endpoint) {
    const res = await axios.get(`/topUsers/${endpoint}`, { withCredentials: true })
    setTopUsersByEndpoint(res.data);
  }

  useEffect(() => {
    getUsersByEndpoint('GET')
  }, [])

  return (
    <>
      <div>
        <div id='badgeContainer'>
          <Badge bg="primary" className='badge' pill onClick={() => getUsersByEndpoint('GET')}>GET</Badge>
          <Badge bg="success" className='badge' pill onClick={() => getUsersByEndpoint('POST')}>POST</Badge>
          <Badge bg="secondary" className='badge' pill onClick={() => getUsersByEndpoint('PATCH')}>PATCH</Badge>
          <Badge bg="danger" className='badge' pill onClick={() => getUsersByEndpoint('DELETE')}>DELETE</Badge>
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
    </>
  )
}

export default UsersByEndpoint