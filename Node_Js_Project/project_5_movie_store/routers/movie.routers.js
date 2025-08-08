const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/movie");
const { homepage, addMoviePage, createMovie, deletemovie, geteditmovie, posteditmovie, viewmovie } = require("../controller/movie.controller")

router.get("/", homepage);
router.get("/add-movie", addMoviePage);
router.post("/add-movie", imageUpload.single("image"), createMovie);
router.get("/edit-movie/:id", geteditmovie);
router.post("/edit-movie/:id", imageUpload.single("image"), posteditmovie);
router.get("/delete-movie/:id", deletemovie);
router.get("/view-movie/:id", viewmovie);

module.exports = router;