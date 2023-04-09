import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from '../../api/axios'
import Form from 'react-bootstrap/Form';
import MyFooter from '../../components/MyFooter';
import './style.css';

function Login() {
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        axios.get('/getSessionInfo', {withCredentials: true})
            .then(res => {
                console.log(res.data)
                if (res.data.isLoggedIn) window.location.href = '/pokemons';
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const res = await axios.post('/login', { username, password }, {withCredentials: true})
        if (res.data.errMsg) setErrMsg(res.data.errMsg);
        else window.location.href = res.data.redirect;
    }

  return (
    <div className='authPage'>
        <div className='authLogoContainer'>
            <img alt='Poke Logo' src='/logo2.png' className='authLogoImg' />
            <h1 className='authLogo'>Pokédex</h1>
        </div>
        <form className='authContainer' onSubmit={handleSubmit}>
            <h1 className='authTitle'>Login</h1>
            <Form.Control type="text" placeholder="Username" className="me-2 authInput" aria-label="Username" name='username' required />
            {/* <input type="text" placeholder="Username" name='username' className='authInput'required/><br/> */}
            <Form.Control type="password" placeholder="Password" className="me-2 authInput" aria-label="Password" name='password' required/>
            {/* <input type="password" placeholder="Password" name='password' className='authInput' required/><br/> */}
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            <br/>
            {errMsg && <p className='authErrMsg'>{errMsg}</p>}
            <Button variant="success" className='authBtn' type='submit'>Login</Button>
        </form>
        <MyFooter />
    </div>
  )
}

export default Login