import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from '../api/axios'


function Login() {
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        axios.get('/isLoggedIn', {withCredentials: true})
            .then(res => {
                if (res.data.isLoggedIn) window.location.href = '/pokemons';
            })
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
        <form className='authContainer' onSubmit={handleSubmit}>
            <h1 className='authTitle'>Login</h1>
            <input type="text" placeholder="Username" name='username' className='authInput'required/><br/>
            <input type="password" placeholder="Password" name='password' className='authInput' required/>
            <br/>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            <br/>
            <Button variant="success" className='authBtn' type='submit'>Login</Button>
            {errMsg && <p className='authErrMsg'>{errMsg}</p>}
        </form>
    </div>
  )
}

export default Login