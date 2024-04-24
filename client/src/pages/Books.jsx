import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Books = () => {
    const [books, setBooks] = useState([]);
    const [userInfo, setUserInfo] = useState({
        librarianid: "",
        name: "",
        email: "",
    });
    const [bookReport, setBookReport] = useState([]);

    const [idInput, setIDInput] = useState(0);

    useEffect(() => {
        const storedIDInput = localStorage.getItem('idInput');

        if (storedIDInput) {
            setIDInput(storedIDInput);
        }
        console.log(idInput)
    }, [idInput]);

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
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllBooks();
    }, []);

    useEffect(() => {
        const fetchBorrowedBooksReport = async () => {
            try {
                const res = await axios.get("http://localhost:8800/transactions");
                console.log(res.data);
                setBookReport(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBorrowedBooksReport();
    }, []);    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/books/${id}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="login-container">
            {userInfo && (
                <div>
                    <h2>User Information</h2>
                    <table className="info center-form">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{userInfo.librarianid}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{userInfo.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{userInfo.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div>
                <h2>Book Report</h2>
                <table className="books">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Borrow Count</th>
                            <th>Current Borrower</th>
                            <th>Return Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookReport.map((item) => (
                            <tr key={item.bookid}>
                                <td>{item.bookid}</td>
                                <td>{item.title}</td>
                                <td>{item.borrow_count}</td>
                                <td>{item.latest_borrowerid ? item.latest_borrowerid : "None"}</td>
                                <td>  {item.latest_return_date ? new Date(item.latest_return_date).toLocaleDateString() : "None"}</td>
                                <td>{item.overdue_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h1>Book List</h1>
            <table className="books">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Publication Year</th>
                        <th>Category</th>
                        <th>Availability</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookid}>
                            <td>{book.bookid}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>{book.pub_year}</td>
                            <td>{book.category}</td>
                            <td>{book.availability}</td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(book.bookid)}>Delete</button>
                                <button className="update">
                                    <Link to={`/update/${book.bookid}`}>Update</Link>
                                </button>
                                <button className="update">
                                    <Link to={`/view/${book.bookid}`}>Manage</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='add-button'><Link to="/add">Add Book</Link></button>
        </div>
    );
};
