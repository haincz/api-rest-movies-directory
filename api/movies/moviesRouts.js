const movies = require("../../movies");
const express = require("express");

const router = express.Router();


router.get('/',  (req, res) => {
  
	movies.moviesList((err, movies) => {
		res.json(movies);
	})

});

router.post('/',  (req, res) => {

	if(req.body.hasOwnProperty("Title") === false) {
		res.status(404).send({"status":"False. Title property is required"})
	} else {

	movies.checkDataBase(req.body.Title, (data) => {
		res.json(data)
	});

	};

});

router.get('/:id',  (req, res) => {
   
	movies.getFilmById(req.params.id, (data) => {

		res.json(data);

	});

});

module.exports = router;