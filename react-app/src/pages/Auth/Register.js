import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from '../../api/axios'
import { Form } from 'react-bootstrap';
import MyFooter from '../../components/MyFooter';
import './style.css';

function Register() {
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        axios.get('/getSessionInfo', { withCredentials: true })
            .then(res => {
                if (res.data.isLoggedIn) window.location.href = '/pokemons';
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const repeat_password = e.target['repeat-password'].value;
        if (password !== repeat_password) {
            setErrMsg('Passwords do not match');
            return;
        }
        const res = await axios.post('/register', { username: username, password: password }, { withCredentials: true })
        if (res.data.errMsg) setErrMsg(res.data.errMsg);
        else window.location.href = '/pokemons';
    }
    return (
        <div className='authPage'>
            <div className='authLogoContainer'>
                <img alt='Poke Logo' src='/logo2.png' className='authLogoImg' />
                <h1 className='authLogo'>Pokédex</h1>
            </div>
            <form className='authContainer' onSubmit={handleSubmit}>
                <h1 className='authTitle'>Register</h1>
                <Form.Control type="text" placeholder="Username" className="me-2 authInput" name='username' required autoComplete={false}/>
                <Form.Control type="password" placeholder="Password" className="me-2 authInput" name='password' required autoComplete={false}/>
                <Form.Control type="password" placeholder="Repeat password" className="me-2 authInput" name='repeat-password' required autoComplete={false}/>
                <p>Already have an account? <Link to="/">Login</Link></p><br />
                {errMsg && <p className='authErrMsg'>{errMsg}</p>}
                <Button variant="success" className='authBtn' type='submit'>Register</Button>
            </form>
            <MyFooter />
        </div>
    )
}

export default Register