import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Update = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: "",
        pub_year: null,
        category: "",
        availability: ""
    });
    const [loading, setLoading] = useState(true); // Add loading state

    const navigate = useNavigate();
    const location = useLocation();
    const bookID = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/books/${bookID}`);
                setBook(response.data[0]);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Fetch book error:", error);
            }
        };
        fetchBook();
    }, [bookID]);

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/books/" + bookID, book)
            navigate("/books")
        } catch (error) {
            console.error(error)
        }
    }

    // Render loading state if data is still being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='form'>
            <h1>Update Book</h1>
            <input type="text" placeholder='title' value={book.title} onChange={handleChange} name='title' />
            <input type="text" placeholder='author' value={book.author} onChange={handleChange} name='author' />
            <input type="text" placeholder='isbn' value={book.isbn} onChange={handleChange} name='isbn' />
            <input type="number" placeholder='pub_year' value={book.pub_year} onChange={handleChange} name='pub_year' />
            <input type="text" placeholder='category' value={book.category} onChange={handleChange} name='category' />
            <input type="number" placeholder='availability' value={book.availability} onChange={handleChange} name='availability' />

            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    );
}
