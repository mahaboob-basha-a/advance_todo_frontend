import React, { useState } from 'react'
import cookies from 'js-cookie'
import './index.css'
import { Link, useNavigate,Navigate } from 'react-router-dom'
import Loader from '../Loader'

const Register = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(false)
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate()
    
    const sendData = async (obj) =>{
        setLoader(true)
        const payload = {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        }
        const res = await fetch('https://advance-todo-backend.onrender.com/register',payload)
        const dat = await res.text()
        setLoader(false)
        if(res.ok){
            alert(dat)
            return navigate('/login')
        }else{
            alert(dat)
        }
    }

    const onRegister = async e =>{
        e.preventDefault()
        if(username === '' || username.length < 4 || password === '' || password.length < 4){
            setError(true)
        }else{
            let obj = {username,password}
            sendData(obj)
            setError(false)
            setUsername('')
            setPassword('')
        }
    }
    const isExist = cookies.get('mbs_token')
    if(isExist){
        return <Navigate to='/' />
    }
  return (
    <div className='register-page'>
        {loader && <Loader />}
        <div className='register-card'>
            <h3>Welcome Back,</h3>
            <form>
                <label htmlFor='username'>Username</label>
                <input value={username} onChange={e=> setUsername(e.target.value)} type='text' id='username' />
                <label htmlFor='password'>Password</label>
                <input value={password} onChange={e=> setPassword(e.target.value)} type='text' id='password'/>
                {error &&
                <span style={{color:'red'}}>Please enter valid details*</span>
                }
                <button type='submit' onClick={onRegister}>Register Now</button>
            </form>
            <span>You already have an account? <Link to='/login'>Login </Link>now.</span>
        </div>
    </div>
  )
}

export default Register