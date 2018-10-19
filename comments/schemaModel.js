const mongoose = require("mongoose");

var schema = new mongoose.Schema ({

	"film_id": String,
	"author": String,
	"commenntContent": String

});

module.exports = mongoose.model('Commnent', schema);