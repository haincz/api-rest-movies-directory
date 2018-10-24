const mongoose = require("mongoose");

var schema = new mongoose.Schema ({

	"film_id": {type: String, required: true},
	"author": {type: String, required: true},
	"commenntContent": {type: String, required: true}

});

module.exports = mongoose.model('Commnent', schema);