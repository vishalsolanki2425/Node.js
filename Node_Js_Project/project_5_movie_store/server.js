const express = require("express");
const mongooseconnect = require("./config/mongooseconfig");
const movieRoutes = require("./routers/movie.routers");
const port = 8200;
const server = express();

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use("/uploads", express.static("uploads") )

server.use("/", movieRoutes);

server.listen(port, () => {
    mongooseconnect();
    console.log(`Server is running at http://localhost:${port}`);
});