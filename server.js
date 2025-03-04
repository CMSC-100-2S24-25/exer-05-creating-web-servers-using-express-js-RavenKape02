const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
const BOOKS_FILE = 'books.txt';

// POST method to add a book
app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body;
    
    //For checking if all the fields are not empty
    if (!bookName || !isbn || !author || !yearPublished) {
        return res.json({ success: false });
    }

    //This is the code for saving the book to the text file
    const bookEntry = `${bookName},${isbn},${author},${yearPublished}\n`;
    fs.appendFile(BOOKS_FILE, bookEntry, (err) => {
        if (err) {
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

// GET Method for finding a book based on isbn and author
app.get('/find-by-isbn-author', (req, res) => {
    const { isbn, author } = req.query;
    
    //Check if the isbn and author field are not empty
    if (!isbn || !author) {
        return res.json([]);
    }

    //read through the file
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.json([]);
        };
        //splice the data written on the text file
        const books = data.split('\n').filter(line => line);
        //filter the values and store the in result
        const result = books.filter(book => {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = book.split(',');
            return bookIsbn === isbn && bookAuthor === author;
        });
        res.json(result);
    });
});

// GET method to find the books given an author 
app.get('/find-by-author', (req, res) => {
    const { author } = req.query;
    //check if author field is not empty
    if (!author) {
        return res.json([]);
    }
    //read through the file
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.json([]);
        };
        //splice the data in books.txt using split method and filter
        const books = data.split('\n').filter(line => line);
        const result = books.filter(book => {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = book.split(',');
            return bookAuthor === author;
        });
        res.json(result);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
