const comments = require("../../comments");
const express = require("express");

const router = express.Router();


router.get('/', (req, res) => {

	comments.commnentsList()
			.then((comments) => res.json(comments))
});

router.post('/', (req, res) => {

	comments.addCommnent(req.body)
		.then((data) => res.json(data))
		.catch((error) => res.status(400).send(error));

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
});


module.exports = router;