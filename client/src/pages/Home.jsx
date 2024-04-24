import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userInfo, setUserInfo] = useState({
    userid: "",
    name: "",
    email: "",
    department: "",
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [idInput, setIDInput] = useState(0);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedIDInput = localStorage.getItem('idInput');
    const storedUserRole = localStorage.getItem('userRole');

    if (storedIDInput && storedUserRole) {
      setIDInput(storedIDInput);
      setUserRole(storedUserRole);
    }
    console.log(idInput)
    console.log(userRole)
  }, [idInput, userRole]);

  useEffect(() => {
    const fetchUserInfo = async (idInput, userRole) => {
      try {
        console.log("Fetching user info for id:", idInput);
        const res = await axios.get(`http://localhost:8800/${userRole}/${idInput}`);
        console.log("User info response:", res.data[0]);
        setUserInfo(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo(idInput, userRole);
  }, [idInput, userRole]);

  useEffect(() => {   
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data)
      } catch (error) {
        console.error(error)
      }
    } 
    fetchAllBooks()
  }, [])

  useEffect(() => {   
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/transactions/${idInput}`)
        setTransactions(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTransactions()
  }, [idInput])

  console.log(transactions)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookid.toString().includes(searchTerm)
  );

  return (
    <div className="login-container">
      {userInfo && (
        <div>
          <h2>User Information</h2>
            <table className="info center-form">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{userRole === 'students' ? userInfo.studentid : userInfo.facultyid}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{userInfo.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{userInfo.email}</td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>{userInfo.department}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      )}
      <div>
        <h2>Borrowed Books</h2>
        <table className="books">
          <thead>
            <tr>
              <th className='header-center'>TID</th>
              <th>BookID</th>
              <th>LibrarianID</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
                <tr key={t.transactionid}>
                <td>{t.transactionid}</td>
                <td>{t.bookid}</td>
                <td>{t.librarianid}</td>
                <td>{t.bdate.split('T')[0]}</td>
                <td>{t.rdate.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h1>Book List</h1>
      <input
      className='search-container'
        type="text"
        placeholder="Search by id, title, author, or category"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
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
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.bookid}>
                <td>{book.bookid}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.pub_year}</td>
                <td>{book.category}</td>
                <td>{book.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
