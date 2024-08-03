import React, { useCallback, useEffect, useState } from 'react'
import cookies from 'js-cookie'
import './index.css'
import ListItem from '../ListItem'
import { Navigate, useNavigate } from 'react-router-dom'
import Loader from '../Loader'


const Home = () => {
  const [todoItem,setTodoitem] = useState('')
  const [todoList,setTodolist] = useState([])
  const [edit,setEdit] = useState(false)
  const [editingItem,setEditingItem] = useState('')
  const [editObj,setEditObj] = useState({})
  const [loader,setLoader] = useState(false)
  const token = cookies.get('mbs_token')
  const navigate = useNavigate()
  // get Todos from db
  const gettodos =useCallback(async () =>{
    setLoader(true)
    let payload = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        token:token
      }
    }
    const res = await fetch('https://advance-todo-backend.onrender.com/todos',payload)
    const data = await res.json()
    setTodolist(data)
    setLoader(false)
  },[token])
  // insert todo
  const addTodoItem = async () =>{
    setLoader(true)
    const obj = {description:todoItem,status:false}
    const payload = {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        token:token
      },
      body:JSON.stringify(obj)
    }
    const res = await fetch('https://advance-todo-backend.onrender.com/todos',payload)
    if(res.ok){
      const data = await res.text()
      gettodos()
      setLoader(false)
      alert(data)
    }
  }
  const addTodo = () =>{
    if(todoItem !== ''){
      addTodoItem()
      setTodoitem('')
    }
  }
  // CRUD operations perform
  const updateDb = async (url,payload) =>{
    setLoader(true)
    const res = await fetch(url,payload)
    if(res.ok){
      const data = await res.text()
      setLoader(false)
      alert(data)
    }
    gettodos()
  }
  // editing item send to backend
  const sendEdit = async () =>{
      const upadatedEditingObj = {...editObj,description:editingItem}
      const payload = {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          token:token
        },
        body:JSON.stringify(upadatedEditingObj)
      }
      const url = `https://advance-todo-backend.onrender.com/todos/${upadatedEditingObj.id}`
      updateDb(url,payload)
      setEdit(false)
      setEditingItem('')
  }
  // edit button click
  const editTodoClick = (id,data,status) =>{
    setEdit(true)
    setEditingItem(data)
    setEditObj({id,description:data,status})
  }
  // delete todo done
  const deleteTodo = id =>{
    let url = `https://advance-todo-backend.onrender.com/todos/${id}`
    let payload = {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        token:token
      }
    }
    updateDb(url,payload)
  }
  const changeStatus = (id,description,status) =>{
    const isChecked = status === 'true'
    const statusObj = {id,description,status:!isChecked}
    const payload = {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        token:token
      },
      body:JSON.stringify(statusObj)
    }
    const url = `https://advance-todo-backend.onrender.com/todos/${statusObj.id}`
    updateDb(url,payload)
  }
  
    useEffect(()=>{
      gettodos()
    },[gettodos])
    // log out
    const logoutClick = () =>{
      cookies.remove('mbs_token')
      return navigate('/login')
    }
    if(!token){
      return <Navigate to='/login' />
    }
  return (
    <div className='home-page'>
      {loader && <Loader />}
      <nav className='nav-bar'>
        <h4>Todo List</h4>
        <button onClick={logoutClick}>Log Out</button>
      </nav>
      <div className='main-content'>
        <div className='home-card'>
          <h3>Add your todo now</h3>
          {edit ? <div className='input-container'>
            <input value={editingItem} onChange={e=> setEditingItem(e.target.value)} placeholder='Edit your todo...' type='text'/>
            <button onClick={sendEdit}>Edit</button>
          </div>
          : <div className='input-container'>
            <input value={todoItem} onChange={e=> setTodoitem(e.target.value)} placeholder='Add your todo...' type='text'/>
            <button onClick={addTodo}>Add</button>
          </div>
          }
          {todoList.length > 0 ?
          <div className='todo-item-list'>
            {todoList.map(item=>{
              const {id,description,status} = item
              return <ListItem key={item.id} id={id} description={description} status={status} editTodo={editTodoClick} deleteTodo={deleteTodo} changeStatus={changeStatus} />
            })}
          </div>
          :
          <h3>No todo lists found...</h3>}
        </div>
      </div>
    </div>
  )
}

export default Home