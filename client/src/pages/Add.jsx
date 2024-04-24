import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Add = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: "",
        pub_year: null,
        category: "",
        availability: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/books")
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
    <div className='form'>
        <h1>Add New Book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='author' onChange={handleChange} name='author'/>
        <input type="text" placeholder='isbn' onChange={handleChange} name='isbn'/>
        <input type="number" placeholder='pub_year' onChange={handleChange} name='pub_year'/>
        <input type="text" placeholder='category' onChange={handleChange} name='category'/>
        <input type="number" placeholder='availability' onChange={handleChange} name='availability'/>

        <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}
