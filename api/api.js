const movies = require("../movies");
const commnents = require("../commnents");
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

router.get('/commnents', (req, res) => {
	commnents.commnentsList((err, commnents) => {
		res.json(commnents);
	});
});

router.post('/commnents', (req, res) => {

	commnents.addCommnent(req.body, (err, data) => {
		res.json(data);
	});
	
});

router.get('/movies/commnents/:id', (req, res) => {

	commnents.getCommnentsByFilmId(req.params.id, (err, commnents) => {
		res.json(commnents);
	});

});

module.exports = router;