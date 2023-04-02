import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from '../api/axios'

function Register() {
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
        const repeat_password = e.target['repeat-password'].value;
        if (password !== repeat_password) {
            setErrMsg('Passwords do not match');
            return;
        }
        const res = await axios.post('/register', { username: username, password: password }, {withCredentials: true})
        if (res.data.errMsg) setErrMsg(res.data.errMsg);
        else window.location.href = '/pokemons';
    }
    return (
        <div className='authPage'>
            <form className='authContainer' onSubmit={handleSubmit}>
                <h1 className='authTitle'>Register</h1>
                <input type="text" placeholder="Username" name='username' className='authInput'required/><br/>
                <input type="password" placeholder="Password" name='password' className='authInput' required /><br/>
                <input type="password" placeholder="Repeat password" name='repeat-password' className='authInput' required /><br/>
                <p>Already have an account? <Link to="/">Login</Link></p><br/>
                <Button variant="success" className='authBtn' type='submit'>Register</Button>
                {errMsg && <p className='authErrMsg'>{errMsg}</p>}
            </form>
        </div>
    )
}

export default Register