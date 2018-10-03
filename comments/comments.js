const mongoose = require("mongoose");

const DB_USER = "moviescomentsapi";
const DB_PASS = "qwe123";
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds215563.mlab.com:15563/movies_and_comments_db`);

var schema = new mongoose.Schema ({

	"film_id": String,
	"author": String,
	"commenntContent": String

});

var Commnent = mongoose.model("Commnent", schema);

function commnentsList (callback) {
	
  Commnent.find({}).exec((err, commnents) => {
      if (err){
        callback(err);
      } else {
        callback(null, commnents);
      }
  });

};



function addCommnent (data, callback) {

	var commnent = new Commnent(data);

	commnent.save((err, dataToSave) => {

	    if(err){
	      callback (err)
	    } else {
	      callback(null, dataToSave);
	    }

	});

}

function getCommnentsByFilmId (id, callback) {

	Commnent.find({film_id:id}).exec((err, comments) => {
      if (err){
        callback(err);
      } else {
        callback(null, comments);
      }
  });	

};




module.exports = {
	commnentsList: commnentsList,
	addCommnent:addCommnent,
	getCommnentsByFilmId:getCommnentsByFilmId
}
