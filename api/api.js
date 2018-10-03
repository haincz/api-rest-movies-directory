const movies = require("../movies");
const comments = require("../comments");
const express = require("express");

const router = express.Router();


router.get('/movies',  (req, res) => {
  
	movies.moviesList((err, movies) =>{
		res.json(movies);
	})

});

router.post('/movies',  (req, res) => {

	movies.checkDataBase(req.body.Title, (data) => {
		res.json(data)
	});

});

router.get('/movies/:id',  (req, res) => {
   
	movies.getFilmById(req.params.id, (data) => {

		res.json(data);

	});

});

router.get('/comments', (req, res) => {
	comments.commnentsList ((err, comments) => {
		res.json(comments);
	});
});

router.post('/comments', (req, res) => {

	comments.addCommnent(req.body, (err, data) => {
		res.json(data);
	});
	
});

router.get('/movies/comments/:id', (req, res) => {

	comments.getCommnentsByFilmId(req.params.id, (err, comments) => {
		res.json(comments);
	});

});

module.exports = router;
