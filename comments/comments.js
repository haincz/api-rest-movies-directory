const mongoose = require("mongoose");
const Commnent = require("./commentsSchema.js");


function commnentsList (callback) {
	
  Commnent.find({}).populate('film_id', 'Title').exec((err, commnents) => {
      if (err){
        callback(err);
      } else {
        callback(null, commnents);
      }
  });

};



function addCommnent (data, callback) {

	let commnent = new Commnent(data);
	
	commnent.save((err, dataToSave) => {
	    if(err){
	      callback (err)
	    } else {
	      callback(null, dataToSave);
	    }
	});

}

function getCommnentsByFilmId (id, callback) {

	Commnent.find({film_id:id}).populate('film_id', 'Title').exec((err, comments) => {
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
