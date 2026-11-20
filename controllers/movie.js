const Movie = require('../models/Movie');
const { errorHandler } = require("../auth");


module.exports.createMovie = (req, res) => {
    let newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre
    });

    return newMovie.save()
        .then(savedMovie => {
            return res.status(201).send(savedMovie);
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.getAllMovies = (req, res) => {
    return Movie.find({})
        .then(movies => {
            if (movies.length === 0) {
                return res.status(404).send({ error: "No movies found" });
            }

            return res.status(200).send({ movies: movies });
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.getMovieById = (req, res) => {
    return Movie.findById(req.params.movieId)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({ error: "Movie not found" });
            }

            return res.status(200).send(movie);
        })
        .catch(error => errorHandler(error, req, res));
};