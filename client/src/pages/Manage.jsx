import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Manage = () => {
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
    const transactionID = location.pathname.split("/")[2];
    
    const [transaction, setTransaction] = useState({
        bookid: 0,  
        borrowerid: 0,
        librarianid: 0,
        bdate: null,
        rdate: null,
    });

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/transactions/${transactionID}`);
                setTransaction(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error("Fetch book error:", error);
            }
        };
        fetchTransaction();
    }, [transactionID]);
    useEffect(() => {
        const fetchBook = async () => {
            if (transaction.bookid !== 0) {
                try {
                    const response = await axios.get(`http://localhost:8800/books/${transaction.bookid}`);
                    setBook(response.data[0]);
                    setLoading(false);
                } catch (error) {
                    console.error("Fetch book error:", error);
                }
            }
        };
        fetchBook();
    }, [transaction.bookid]);

    const handleChangeBook = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleChangeTransaction = (e) => {
        const { name, value } = e.target;
        setTransaction((prev) => ({ ...prev, [name]: value }));
        console.log(transaction);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/books/" + transaction.bookid, book)
            navigate(`/view/${transaction.bookid}`)
        } catch (error) {
            console.error(error)
        }
        try {
            await axios.put("http://localhost:8800/transactions/" + transactionID, transaction)
            navigate(`/view/${transaction.bookid}`)
        } catch (error) {
            console.error(error)
        }
    }

    // Render loading state if data is still being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='form-manage'>  
            <h1>Process Book</h1>
            <h3>{book.title}</h3>
            <p>Librarian ID: {transaction?.librarianid}</p>
            <input type="number" placeholder='Borrower ID' value={transaction.borrowerid} onChange={handleChangeTransaction} name='borrowerid'/>
            <input type="date" placeholder='Borrow Date' value={transaction.bdate ? transaction.bdate.split('T')[0] : ''} onChange={handleChangeTransaction} name='bdate' />
            <input type="date" placeholder='Return Date' value={transaction.rdate ? transaction.rdate.split('T')[0] : ''} onChange={handleChangeTransaction} name='rdate' />
            <input type="number" placeholder='availability' value={book.availability} onChange={handleChangeBook} name='availability' />

            <button className="formButton" onClick={handleClick}>Process</button>
        </div>
    );
}
