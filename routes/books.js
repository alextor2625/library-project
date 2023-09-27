var express = require('express');
var router = express.Router();

const Book = require('../models/Book')

router.get('/', (req, res, next)=>{

    Book.find()
        .then((results) =>{
            console.log('There are books', results);
            res.render('books/books-list.hbs', {results})

        })
        .catch((err) => {
            console.log(err);
            next()
        })

    
})

router.get('/book-details/:bookID', (req, res, next) =>{
    let { bookID } = req.params;
    Book.findById(bookID)
        .then((foundbook) =>{
            console.log( "These is the book from the DB", foundbook)
            res.render('books/book-detail.hbs', foundbook)

        })
        .catch((err) => {
            console.log(err);
            next()
        })
})

router.get('/create',(req, res, next) =>{
    res.render('books/book-create.hbs')
})

router.post('/create', (req, res, next) =>{
    // let newBook = req.body;
    // Book.create(newBook) //Same thing
    let { title, description, author, rating } = req.body;
    Book.create({
        title,
        description,
        author,
        rating
    })
    .then((createdBook) => {
        console.log('This is the new Book ===>', createdBook);
        res.redirect(`/books/book-details/${createdBook._id}`)
    })
    console.log('This is the book we are trying to create', req.body);
} )

router.get('/edit/:bookID', (req,res,next) =>{

    let { bookID } = req.params;
    Book.findById(bookID)
        .then((bookToEdit ) =>{
            console.log( "These is the book from the DB", bookToEdit )
            res.render('books/book-edit.hbs', bookToEdit )

        })
        .catch((err) => {
            console.log(err);
            next()
        })
})

router.post('/edit/:bookID', (req,res,next) =>{
    let { bookID } = req.params;

    let { title, description, author, rating } = req.body;

    Book.findByIdAndUpdate(bookID,{
        title, 
        description, 
        author, 
        rating
    }, {new: true})
        .then((updatedBook) => {
            console.log("Book after update ===>", updatedBook);
            res.redirect(`/books/book-details/${updatedBook._id}`)
        })

})

router.post('/delete/:bookID', (req,res,next) =>{
    let { bookID } = req.params;

    Book.findByIdAndRemove(bookID)
        .then((result) =>{
            console.log('Deletion result ===>', result);
            res.redirect('/books')
        })
        .catch((err) => {
            console.log(err);
            next()
        })
})

module.exports = router;