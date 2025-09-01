const express = require("express");
const { homepage, loginpage, registerpage, singleblogpage, postloginpage, postregisterpage, contactpage } = require("../controller/web.controller");
const webroute = express.Router();

webroute.get("/", homepage);
webroute.get("/singleblog/:id", singleblogpage);
webroute.get("/login", loginpage);
webroute.post("/login", postloginpage);
webroute.get("/register", registerpage);
webroute.post("/register", postregisterpage);
webroute.get("/contact", contactpage);

module.exports = webroute;