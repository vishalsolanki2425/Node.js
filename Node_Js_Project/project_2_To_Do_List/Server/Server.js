const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true }));

let tasks = [
    {
        id: 1,
        name: 'Go To The collage',
        desc: 'Go To The collage',
        dt: '01-02-2025 12:15 am',
        priority: 'High',
    },
    {
        id: 2,
        name: 'Go To The Hospital',
        desc: 'Go To The Hospital',
        dt: '01-02-2025 12:15 am',
        priority: 'Medium',
    },
    {
        id: 3,
        name: 'Go To The Market',
        desc: 'Go To The Market',
        dt: '01-02-2025 12:15 am',
        priority: 'Low',
    }
];

server.get('/', (req, res) => {
    res.render('index', { tasks });
});

server.get('/add', (req, res) => {
    res.render('index');
});

server.post('/add', (req, res) => {
    let task = req.body;
    task.id = tasks.length + 1;
    tasks.push(task);
    res.redirect('/');
})

server.get('/edit_task/:id', (req, res) => {
    let id = req.params.id;
    let task = tasks.find((task) => task.id == id);
    res.render('edit_task', { task });
});

server.post('/edit_task/:id', (req, res) => {
    let id = req.params.id;
    let updatedTask = req.body;
    tasks = tasks.map(task => {
        if (task.id == id) {
            return { ...task, ...updatedTask, id: task.id };
        }
        return task;
    });
    res.redirect('/');
});

server.get('/delete_task/:id', (req, res) => {
    let id = req.params.id;
    tasks = tasks.filter((task) => task.id != id);
    res.redirect('/');
})

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});