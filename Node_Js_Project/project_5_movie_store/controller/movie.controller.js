const movieModels = require("../models/movie.models");
const Movie = require("../models/movie.models");
const path = require("path")
const fs = require("fs");

const homepage = async (req, res) => {
    const movies = await Movie.find();
    res.render("index", { movies });
};

const addMoviePage = (req, res) => {
    res.render("add-movie");
};

const createMovie = async (req, res) => {
    let image = req.file ? "/uploads/" + req.file.filename : "";
    await Movie.create({ ...req.body, image });
    console.log("Movie added successfully");
    res.redirect("/");
};

const geteditmovie = async (req, res) => {
    let id = req.params.id;
    let movie = await movieModels.findById(id);
    res.render('edit-movie', { movie: movie });
}

const posteditmovie = async (req, res) => {
    let id = req.params.id;
    let movie = await movieModels.findById(id);
    if (!movie) {
        return res.redirect("back");
    }
    let moviepath = movie.image;
    if (req.file) {
        if (movie.image) {
            let oldmoviePath = path.join(__dirname, "..", movie.image);
            if (oldmoviePath) {
                fs.unlinkSync(oldmoviePath);
            }
        }
        moviepath = `/uploads/${req.file.filename}`;
    }

    await movieModels.findByIdAndUpdate(id, { ...req.body, image: moviepath });
    console.log("Update Successfully");
    res.redirect('/');
};

const deletemovie = async (req, res) => {
    let id = req.params.id;
    let moviestore = await movieModels.findById(id);

    if (moviestore.image) {
        let moviepath = path.join(__dirname, '..', moviestore.image)
        if (moviepath != "") {
            await fs.unlinkSync(moviepath)
        }
        await movieModels.findByIdAndDelete(id)
        console.log("Movie Delete Successfully")
        res.redirect("/")
    }
}

const viewmovie = async (req, res) => {
    const id = req.params.id;
    let movies = await Movie.findById(id);
    res.render("view-movie", { movies });
}

module.exports = { homepage, addMoviePage, createMovie, deletemovie, geteditmovie, posteditmovie, viewmovie }