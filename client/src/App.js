import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Books } from "./pages/Books";
import { Add } from "./pages/Add";
import { Update } from "./pages/Update";
import { Home } from "./pages/Home";
import "./style.css";
import axios from "axios";
import { Manage } from "./pages/Manage";
import { ViewTransactions } from "./pages/ViewTransactions";
import Header from "./pages/Header";

function Login({ onLogin, setIDInput }) {
  const [idList, setIDList] = useState([]);
  const [userType, setUserType] = useState("librarians");

  useEffect(() => {
    fetchAllIDs();
  }, [userType]);

  const fetchAllIDs = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/${userType}`);
      setIDList(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    const idInput = parseInt(document.querySelector("input").value.trim());
    console.log(userType);
    
    const idPropertyName = userType === 'librarians' ? 'librarianid' :
                           userType === 'students' ? 'studentid' :
                           userType === 'faculty' ? 'facultyid' :
                           null;
  
    if (!idPropertyName) {
      alert("Invalid user type");
      return;
    }
  
    const isIDInList = idList.some((item) => item[idPropertyName] === idInput);
    
    if (!isNaN(idInput) && isIDInList) {
      setIDInput(idInput);
      onLogin(userType, idInput);
    } else {
      alert("Invalid id");
    }
  };
  
  
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" placeholder="id" />
      <br />
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="librarians">Librarian</option>
        <option value="students">Student</option>
        <option value="faculty">Faculty</option>
      </select>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [idInput, setIDInput] = useState(0);

  const handleLogin = (userType, idInput) => {
    setIsLoggedIn(true);
    setUserRole(userType);
    setIDInput(idInput);

    // Store the values in localStorage
    localStorage.setItem('userRole', userType);
    localStorage.setItem('idInput', idInput);
  };

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    const storedIDInput = localStorage.getItem('idInput');

    if (storedUserRole && storedIDInput) {
      setUserRole(storedUserRole);
      setIDInput(storedIDInput);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                userRole === "librarians" ? (
                  <Navigate to="/books" />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <Login onLogin={(userType, idInput) => handleLogin(userType, idInput)} setIDInput={setIDInput} />
              )
            }
          />
          <Route path="/home" element={<Home idInput={idInput} userRole={userRole} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/manage/:id" element={<Manage />} />
          <Route path="/view/:id" element={<ViewTransactions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
