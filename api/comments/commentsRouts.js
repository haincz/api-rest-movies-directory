const comments = require("../../comments");
const express = require("express");

const router = express.Router();


router.get('/', (req, res) => {
	comments.commnentsList((err, comments) => {
		res.json(comments);
	});
});

router.post('/', (req, res) => {

	//in future here should be checking is ID exist in dataBase (use: movies.getFilmById)
	// if(req.body.hasOwnProperty("film_id") !== true) {
	// 	res.status(404).send({"status":"False. Correct film_id is required"})
	// } else {
		comments.addCommnent(req.body, (err, data) => {

			if (err){

				res.status(400).send(err)
			
			} else {

			res.json(data);

			}
		
		});
	
	// };

});

router.get('/moviecomments/:id', (req, res) => {

	comments.getCommnentsByFilmId(req.params.id, (err, comments) => {
		res.json(comments);
	});

});


module.exports = router;