import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const ViewTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();
    const bookID = location.pathname.split("/")[2];
    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: "",
        pub_year: null,
        category: "",
        availability: ""
    });
    const [userInfo, setUserInfo] = useState({
        userid: "",
        name: "",
        email: "",
        department: "",
      });

    const [idInput, setIDInput] = useState(0);
    
      useEffect(() => {
        const storedIDInput = localStorage.getItem('idInput');
        const storedUserRole = localStorage.getItem('userRole');
    
        if (storedIDInput && storedUserRole) {
          setIDInput(storedIDInput);
        }
    }, [idInput]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/books/${bookID}`);
                setBook(response.data[0]);
            } catch (error) {
                console.error("Fetch book error:", error);
            }
        };
        fetchBook();
    }, [bookID]);

    useEffect(() => {
        const fetchUserInfo = async (idInput) => {
          try {
            console.log("Fetching user info for id:", idInput);
            const res = await axios.get(`http://localhost:8800/librarians/${idInput}`);
            console.log("User info response:", res.data[0]);
            setUserInfo(res.data[0]);
          } catch (error) {
            console.error(error);
          }
        };
        fetchUserInfo(idInput);
      }, [idInput]);
    
    useEffect(() => {   
        const fetchTransactions = async () => {
          try {
            const res = await axios.get(`http://localhost:8800/transactions/${bookID}`)
            setTransactions(res.data)
          } catch (error) {
            console.error(error)
          }
        }
        fetchTransactions()
      }, [bookID])
    
    const [transactionAdd, setTransactionAdd] = useState({
        bookid: bookID,
        borrowerid: 0,
        librarianid: userInfo?.librarianid,
        bdate: "",
        rdate: "",
    });

    const handleChange = (e) => {
        setTransactionAdd(prev=>({...prev, [e.target.name]: e.target.value}));
        console.log(transactionAdd)
    }

    const handleChangeBook = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/transactions", transactionAdd)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
        try {
            await axios.put("http://localhost:8800/books/" + bookID, book)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }
    return (
      <div className="login-container">
        <h2>Transaction History</h2>
        <table className="books">
          <thead>
            <tr>
              <th className='header-center'>TID</th>
              <th>Borrower ID</th>
              <th>Librarian ID</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
                <tr key={t.transactionid}>
                <td>{t.transactionid}</td>
                <td>{t.borrowerid}</td>
                <td>{t.librarianid}</td>
                <td>{t.bdate ? t.bdate.split('T')[0] : 'null'}</td>
                <td>{t.rdate ? t.rdate.split('T')[0] : 'null'}</td>
                <td>           
                    <button className="update">
                        <Link to={`/manage/${t.transactionid}`}>Manage</Link>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='form center-form'>
            <h1>Add New Transaction</h1>
            <input type="number" placeholder='Book ID' value={bookID} onChange={handleChange} name='bookid'/>
            <input type="number" placeholder='Borrower ID' onChange={handleChange} name='borrowerid'/>
            <input type="number" placeholder='Librarian ID' value={transactionAdd?.librarianid} onChange={handleChange} name='librarianid'/>
            <input type="date" placeholder='Borrow Date' onChange={handleChange} name='bdate'/>
            <input type="date" placeholder='Return Date' onChange={handleChange} name='rdate'/>
            <input type="number" placeholder='availability' value={book.availability} onChange={handleChangeBook} name='availability' />
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>
      </div>
    );
};
