const express = require("express");
const { addusers, viewallusers, addUser, deleteUser, editUser, posteditUser, userprofile } = require("../controller/user.controller");
const usersrouter = express.Router();
const userImage = require("../middleware/image.middleware")

usersrouter.get("/addusers", addusers);
usersrouter.get("/viewAllusers", viewallusers);
usersrouter.post("/addusers", userImage.single("image"), addUser);
usersrouter.get("/editUser/:id", editUser);
usersrouter.post("/editUser/:id", userImage.single("image"), posteditUser);
usersrouter.get("/deleteUser/:id", deleteUser);
usersrouter.get("/profile", userprofile)

module.exports = usersrouter;