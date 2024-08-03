import React, { useState } from 'react'
import cookies from 'js-cookie'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './index.css'
import Loader from '../Loader';

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(false)
    const [showPass,setShowpass] = useState(false)
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate()
    
    const sendLogin = async (obj) =>{
        setLoader(true)
        const payload = {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        }
        const res = await fetch('https://advance-todo-backend.onrender.com/login',payload)
        if(res.ok){
            const data = await res.json()
            setLoader(false)
            cookies.set('mbs_token',data.token,{expires:1})
            return navigate('/')
        }else{
            const data = await res.text()
            setLoader(false)
            alert(data)
        }
    }
    const onLogin = async e =>{
        e.preventDefault()
        if(username === '' || username.length < 4 || password === '' || password.length < 4){
            setError(true)
        }else{
            const obj = {username,password}
            sendLogin(obj)
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
    <div className='login-page'>
        {loader && <Loader />}
        <div className='login-card'>
            <h3>Welcome back,</h3>
            <form>
                <label htmlFor='username'>Username</label>
                <input value={username} onChange={e=> setUsername(e.target.value)} type='text' id='username' />
                <label htmlFor='password'>Password</label>
                <div className='show-hide-pass'>
                <input value={password} onChange={e=> setPassword(e.target.value)} type={showPass ? 'text':'password'} id='password'/>
                <span onClick={()=> setShowpass(prev => !prev)}>{showPass ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                {error && 
                <span style={{color:'red'}}>Please enter valid details*</span>
                }
                <button onClick={onLogin} type='submit'>Login Now</button>
            </form>
            <span>You don't have an account? <Link to='/register'>Register </Link>now.</span>
        </div>
    </div>
  )
}

export default Login