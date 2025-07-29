const express = require('express');
const mongooseconnect = require('./config/mongooseconfig');
const bookmodel = require('./model/book_model');

const server = express();
server.set('view engine', 'ejs');
server.use(express.urlencoded());

server.use(express.static('public'));

server.get('/', async (req, res) => {
    let books = await bookmodel.find();
    res.render('index', { book: books });
})

server.get('/addbook', async (req, res) => {
    res.render('add_book');
})

server.post('/addbook', async (req, res) => {
    bookmodel.create(req.body);
    console.log("Book added successfully");
    res.redirect('/');
})

server.get('/edit_book/:id', async (req, res) => {
    let id = req.params.id;
    let book = await bookmodel.findById(id);
    res.render('edit_book', { book: book });
})

server.post('/edit_book/:id', async (req, res) => {
    let id = req.params.id;
    await bookmodel.findByIdAndUpdate(id, req.body);
    console.log("Book updated successfully");
    res.redirect('/');
})

server.get('/delete_book/:id', async (req, res) => {
    let id = req.params.id;
    await bookmodel.findByIdAndDelete(id);
    console.log("Book deleted successfully");
    res.redirect('/');
})


server.listen(8500, () => {
    mongooseconnect();
    console.log("server is running on http://localhost:8500");
})