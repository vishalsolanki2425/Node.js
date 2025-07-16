const express = require("express");

const server = express();
server.set("view engine", "ejs");

server.get("/",(req,res)=>{
    res.render("home");
})
server.get("/about",(req,res)=>{
    res.render("about");
})

server.listen(8000,()=>{
    console.log("Server is running on http://localhost:8000");
})