const express = require('express');
const movieController = require('../controllers/movie');
const { verify, verifyAdmin } = require("../auth");


const router = express.Router();


router.post("/addMovie", verify, verifyAdmin, movieController.createMovie);
router.get("/getMovies", movieController.getAllMovies);
router.get("/getMovie/:movieId", movieController.getMovieById);


module.exports = router;