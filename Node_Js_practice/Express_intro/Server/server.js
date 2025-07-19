const express = require('express');
const server = express();
server.set('view engine', 'ejs');
server.use(express.urlencoded())

const students = [
    {
        id: 1,
        name: 'Vishal',
        age: 20,
        email: 'Vishal@gmail.com',
        mobileno: '9909295049'
    },
    {
        id: 2,
        name: 'Khushal',
        age: 20,
        email: 'Khushal@gmail.com',
        mobileno: '1234567890'
    },
    {
        id: 3,
        name: 'Yogesh',
        age: 23,
        email: 'Yogesh@gmail.com',
        mobileno: '9876543210'
    },
    {
        id: 4,
        name: 'Vivek',
        age: 21,
        email: 'Vivek@gmail.com',
        mobileno: '0123456789'
    },
    {
        id: 5,
        name: 'Jenish',
        age: 22,
        email: 'Jenish@gmail.com',
        mobileno: '1234567890'
    }
]

server.get('/', (req, res) => {
    res.render('index', { students });
})

server.get('/add-student', (req, res) => {
    res.render('Add_student');
})

server.post('/add-student', (req, res) => {
    let newStudent = req.body;
    newStudent.id = students.length + 1;
    students.push(newStudent);
    res.redirect('/');
});

server.get('/delete-student/:id', (req, res) => {
    let id = req.params.id;
    students = students.filter(student => student.id != id);
    res.redirect('/');
})

server.listen(8000, () => {
    console.log('Server start on http://localhost:8000');
});