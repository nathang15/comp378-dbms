import express from "express"
import mysql2  from "mysql2"
import cors from "cors"

const app = express()

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: password for MySQL root,
    database: "library"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.json("hello")
})

app.get("/books", (req,res) => {
    const searchTerm = req.query.searchTerm;
    let query = "SELECT * FROM books";
    let values = [];

    if (searchTerm) {
        query += " WHERE bookid LIKE ?  OR title LIKE ? OR author LIKE ? OR category LIKE ?";
        values = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];
    }

    db.query(query, values, (err, result) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});


app.post("/books", (req,res) => {
    const query = "INSERT INTO books (`title`, `author`, `isbn`, `pub_year`, `category`, `availability`) VALUES (?)"
    const values = [
        req.body.title, 
        req.body.author, 
        req.body.isbn, 
        req.body.pub_year, 
        req.body.category, 
        req.body.availability
    ]

    db.query(query, [values], (err, result) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Book added successfully!")
        }
    })
})

app.delete("/books/:bookid", (req, res) => {
    const bookID = req.params.bookid
    const query = "DELETE FROM books WHERE bookid = ?"
    db.query(query, [bookID], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Book deleted successfully!")
        }
    })
})

app.get("/books/:bookid", (req, res) => {
    const bookID = req.params.bookid
    const query = "SELECT * FROM books WHERE bookid = ?"
    db.query(query, [bookID], (err, result) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json(result)
        }
    })
})



app.put("/books/:bookid", (req, res) => {
    const bookID = req.params.bookid
    const query = "UPDATE books SET `title` = ?, `author` = ?, `isbn` = ?, `pub_year` = ?, `category` = ?, `availability` = ? WHERE bookid = ?"
    const values = [
        req.body.title, 
        req.body.author, 
        req.body.isbn, 
        req.body.pub_year, 
        req.body.category, 
        req.body.availability
    ]
    db.query(query, [...values, bookID], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Book updated successfully!")
        }
    })
})

app.get("/librarians", (req, res) => {
    const query = "SELECT librarianid FROM librarians";
    db.query(query, (err, result) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json(result)
        }
    })
});

app.get("/librarians/:librarianid", (req, res) => {
    const librarianID = req.params.librarianid;
    const query = "SELECT * FROM librarians WHERE librarianid = ?";
    db.query(query, [librarianID], (err, result) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});

app.get("/students", (req, res) => {
    const query = "SELECT studentid FROM students";
    db.query(query, (err, result) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json(result)
        }
    })
});

app.get("/students/:studentid", (req, res) => {
    const studentID = req.params.studentid;
    const query = "SELECT * FROM students WHERE studentid = ?";
    db.query(query, [studentID], (err, result) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});

app.get("/faculty", (req, res) => {
    const query = "SELECT facultyid FROM faculty";
    db.query(query, (err, result) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json(result)
        }
    })
});

app.get("/faculty/:facultyid", (req, res) => {
    const facultyID = req.params.facultyid;
    const query = "SELECT * FROM faculty WHERE facultyid = ?";
    db.query(query, [facultyID], (err, result) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});

// Fetch Transaction based on any type of id
app.get("/transactions/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM transactions WHERE bookid = ? OR borrowerid = ? OR transactionid = ?";

    db.query(query, [id, id, id], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});

// Add transaction
app.post("/transactions", (req,res) => {
    const query = "INSERT INTO transactions (`bookid`, `borrowerid`, `librarianid`, `bdate`, `rdate`) VALUES (?)"
    const values = [
        req.body.bookid, 
        req.body.borrowerid, 
        req.body.librarianid, 
        req.body.bdate, 
        req.body.rdate
    ]
    db.query(query, [values], (err, result) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Transaction successful!")
        }
    })
})

// modify transaction based on tid
app.put("/transactions/:transactionid", (req, res) => {
    const tID = req.params.transactionid
    const query = "UPDATE transactions SET `bdate` = ?, `rdate` = ? WHERE transactionid = ?"
    const values = [
        req.body.bdate, 
        req.body.rdate,
    ]
    db.query(query, [...values, tID], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Transaction updated successfully!")
        }
    })
})

// Route to get most and least borrowed books
app.get("/transactions", (req, res) => {
    // SQL query to get most borrowed books
    const bookReportQuery = `
        SELECT 
            b.bookid,
            b.title,
            COUNT(t.bookid) AS borrow_count,
            (SELECT borrowerid FROM library.transactions WHERE bookid = b.bookid ORDER BY bdate DESC LIMIT 1) AS latest_borrowerid,
            (SELECT rdate FROM library.transactions WHERE bookid = b.bookid ORDER BY bdate DESC LIMIT 1) AS latest_return_date,
            CASE 
                WHEN b.availability = 0 AND (SELECT rdate FROM library.transactions WHERE bookid = b.bookid ORDER BY bdate DESC LIMIT 1) < CURDATE() THEN 'Overdue'
                ELSE 'Not Overdue'
            END AS overdue_status
        FROM 
            library.books b
        LEFT JOIN 
            library.transactions t ON b.bookid = t.bookid
        GROUP BY 
            b.bookid
        ORDER BY 
            borrow_count DESC
        LIMIT 10;
    `;
    // Execute queries
    db.query(bookReportQuery, (err, report) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json(report)
        }
    });
});
app.listen(8800, () => {
    console.log("Backend server is running!")
})