import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import './index.css'

const ListItem = (prop) => {
    const {id,status,description,editTodo,deleteTodo,changeStatus} = prop
    const isStatus = status === 'true'
  return (
    <div className='item-card'>
        <div className='item-left'>
        <input onChange={()=> changeStatus(id,description,status)} checked={isStatus} type='checkbox' />
        <p className={isStatus ? 'checked' : ''}>{description}</p>
        </div>
        <div className='item-right'>
            <button onClick={()=> editTodo(id,description,status)}><CiEdit /></button>
            <button onClick={()=> deleteTodo(id)} style={{color:'#f62100'}}><MdDeleteForever /></button>
        </div>
    </div>
  )
}

export default ListItem