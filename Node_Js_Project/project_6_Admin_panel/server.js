const express = require("express");
const router = require("./routers/index");
const dbconnect = require("./config/dbconnect");
const cookieParser = require("cookie-parser")
const path = require("path");
const port = 8500;

const server = express();
server.set("view engine", "ejs");
server.use(express.urlencoded());
server.use(express.static("public"));
server.use(cookieParser());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use("/", router)

server.listen(port, () => {
    dbconnect();
    console.log(`server is running on http://localhost:${port}`);
});