const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema ({

	"film_id": {type: String, ref: 'Film', required: true},
	"author": {type: String, required: true},
	"commenntContent": {type: String, required: true}
});

module.exports = mongoose.model('Commnent', commentSchema);