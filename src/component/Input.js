import React from 'react'
import "./input.css"
import { FaSearch } from 'react-icons/fa';

const Input = ({text, submit, func}) => {
  return (
    <form className='input' onSubmit={submit}>
      <input 
        type={"text"} 
        className='input_value' 
        placeholder="Enter location"
        onChange={text} 
        />
      <span className='input_icon' onClick={func}>
       <FaSearch />
      </span>
    </form>
  )
}

export default Input
