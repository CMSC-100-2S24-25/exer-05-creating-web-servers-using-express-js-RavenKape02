const needle = require('needle');
const BASE_URL = 'http://localhost:3000';

// add the first book function
const addBook = async () => {
    const book = {
        bookName: 'Harry Potter and the Philosopher’s Stone',
        isbn: '978-0-7475-3269-9',
        author: 'J.K Rowling',
        yearPublished: 1997
    };
    
    try {
        const response = await needle('post', `${BASE_URL}/add-book`, book, { json: true });
        console.log('Add Book Response:', response.body);
    } catch (error) {
        console.error('Error adding book:', error);
    }
};

//add the second book
const addBook2 = async () => {
    const book = {
        bookName: 'Harry Potter and the Chamber of Secrets',
        isbn: '0-7475-3849-2',
        author: 'J.K Rowling',
        yearPublished: 1998
    };
    
    try {
        const response = await needle('post', `${BASE_URL}/add-book`, book, { json: true });
        console.log('Add Book Response:', response.body);
    } catch (error) {
        console.error('Error adding book:', error);
    }
};

//function for adding the third book
const addBook3 = async () => {
    const book = {
        bookName: 'The Little Prince',
        isbn: '978-0156012195',
        author: 'Antoine Saint-Exupery',
        yearPublished: 1943
    };
    
    try {
        const response = await needle('post', `${BASE_URL}/add-book`, book, { json: true });
        console.log('Add Book Response:', response.body);
    } catch (error) {
        console.error('Error adding book:', error);
    }
};

// test function for get method given the isbn and author
const findByIsbnAndAuthor = async () => {
    const isbn = '978-0-7475-3269-9';
    const author = 'J.K Rowling';
    
    try {
        const response = await needle('get', `${BASE_URL}/find-by-isbn-author?isbn=${isbn}&author=${encodeURIComponent(author)}`);
        console.log('Find by ISBN and Author Response:', response.body);
    } catch (error) {
        console.error('Error finding book by ISBN and Author:', error);
    }
};

// test function for get method given the author field
const findByAuthor = async () => {
    const author = 'J.K Rowling';
    
    try {
        const response = await needle('get', `${BASE_URL}/find-by-author?author=${encodeURIComponent(author)}`);
        console.log('Find by Author Response:', response.body);
    } catch (error) {
        console.error('Error finding book by Author:', error);
    }
};

// let's run all the tests
(async () => {
    await addBook();
    await addBook2();
    await addBook3();
    await findByIsbnAndAuthor();
    await findByAuthor();
})();
