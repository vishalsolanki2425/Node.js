const express = require("express");
const router = require("./routers/index");
const dbconnect = require("./config/dbconnect");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const localStrategy = require("./middleware/LocalStrategy");
const path = require("path");
const flash = require('connect-flash');
const flashMessage = require("./middleware/flashMessage");
const flipkartrouter = require("./routers/flipkart.route");
const MongoStore = require("connect-mongo");
const port = 8500;

const server = express();
server.set("view engine", "ejs");
server.use(express.urlencoded());
server.use(express.static("public"));
server.use(cookieParser());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(flash());

server.use(session({
    name: "thanks",
    secret: "thank you",
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/admin_panel",
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

server.use(passport.session());
server.use(passport.initialize());
server.use(passport.setAutheticatUser);
server.use(flashMessage.setFlashMessage);

server.use((req, res, next) => {
    res.locals.users = req.user || null;
    next();
})

server.use("/", router);
server.use("/flipkart", flipkartrouter);

server.listen(port, () => {
    dbconnect();
    console.log(`server is running on http://localhost:${port}`);
});