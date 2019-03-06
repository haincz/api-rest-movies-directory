const movies = require("../../movies");
const express = require("express");

const router = express.Router();


router.get('/',  (req, res) => {
  
	movies.moviesList()
		.then((movies) => res.json(movies))
		.catch((error) => res.status(404).send(error));

	// movies.moviesList((err, movies) => {
	// 	res.json(movies);
	// });

});

router.post('/',  (req, res) => {

	if(req.body.hasOwnProperty("Title") === false) {
		res.status(400).send({"status":"False. Title property is required"})
	} else {

		movies.checkDataBase(req.body.Title)
			.then((data) => res.json(data))
			.catch((error) => res.status(400).send(error))		

		// movies.checkDataBase(req.body.Title, (data) => {
		// 	res.json(data)
		// });
	};

});

router.get('/best-ratings', (req, res) => {
	
	movies.getBestRatings()
		.then((data) => res.json(data))
		.catch((error) => res.status(404).send(error));

});

router.get('/:id', (req, res) => {
   	
	movies.getFilmById(req.params.id)
		.then((data) => res.json(data))
		.catch((error) => res.status(404).send({error: {message:"Not Found"}}));

});


module.exports = router;