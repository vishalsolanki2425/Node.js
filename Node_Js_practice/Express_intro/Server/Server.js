const express = require("express");

const server = express();
server.set("view engine", "ejs");
server.use(express.urlencoded())

let students = [
    {
        id: 1,
        name: "Jenish",
        age: 23,
        email: "Jenish@gmail.com",
        mobail: 1234567890
    },
    {
        id: 2,
        name: "Vishal",
        age: 20,
        email: "vishal@gmail.com",
        mobail: 9909295049
    },
    {
        id: 3,
        name: "Khushal",
        age: 20,
        email: "Khushal@gmail.com",
        mobail: 9909509092
    },
    {
        id: 4,
        name: "Yogesh",
        age: 23,
        email: "Yogesh@gmail.com",
        mobail: 2020222323
    },
    {
        id: 5,
        name: "Vivek",
        age: 22,
        email: "Vivek@gmail.com",
        mobail: 1010203232
    },
]

server.get("/",(req,res)=>{
    res.render("home", {students});
})
server.get("/add-student",(req,res)=>{
    res.render("AddStudent");
})
server.post("/new-student",(req,res)=>{
    let student = req.body
    students.push(student);
    res.redirect("/");
})

server.listen(8000,()=>{
    console.log("Server is running on http://localhost:8000");
})