const comments = require("../../comments");
const express = require("express");

const router = express.Router();


router.get('/', (req, res) => {

	comments.commnentsList()
			.then((comments) => res.json(comments))


	// comments.commnentsList((err, comments) => {
	// 	res.json(comments);
	// });
});

router.post('/', (req, res) => {

	//in future here should be checking is ID exist in dataBase (use: movies.getFilmById)
	// if(req.body.hasOwnProperty("film_id") !== true) {
	// 	res.status(404).send({"status":"False. Correct film_id is required"})
	// } else {

		comments.addCommnent(req.body)
				.then((data) => res.json(data))
				.catch((error) => res.status(400).send(error));


		// comments.addCommnent(req.body, (err, data) => {
		// 	if (err){
		// 		res.status(400).send(err)
		// 	} else {
		// 	res.json(data);
		// 	}		
		// });
	
	// };

});

router.get('/moviecomments/:id', (req, res) => {

	function send(data) {
		if (data instanceof Error){
			res.status(404).send(error)
		} else if (!data.length){
			res.status(404).send({"Error":"Not Found"})
		} else {
			res.json(data)
		}
	}

	comments.getCommnentsByFilmId(req.params.id)
			.then(send)
			.catch(send)




	// 	if (err) {
	// 		res.status(404).send({"error":"Not Found"});
	// 	} else {
	// 		if (!comments.length){
	// 			res.status(404).send({"error":"Not Found"});
	// 		} else {
	// 			res.json(comments);
	// 		};
	// 	};
	// });

});


module.exports = router;