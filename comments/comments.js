const mongoose = require("mongoose");
const Commnent = require("./commentsSchema.js");
const Q = require("q")


function commnentsList () {

	let def = Q.defer();

	Commnent.find({}).populate('film_id', 'Title').exec((err, commnents) => {
    	if (err){
        	def.reject(err);
      	} else {
        	def.resolve(commnents);
      	}
 	});

 	return def.promise;

};



function addCommnent (data) {

	let def = Q.defer();
	let commnent = new Commnent(data);
	
	commnent.save((err, dataToSave) => {
	    if(err){
	    	def.reject(err)
	    } else {
	    	def.resolve(dataToSave);
	    }
	});

	return def.promise

}

function getCommnentsByFilmId (id, callback) {

	let def = Q.defer()

	Commnent.find({film_id:id}).populate('film_id', 'Title').exec((err, comments) => {
    	if (err){
        	def.reject(err);
    	} else {
    		def.resolve(comments);
    	}
    	
  	});	

  	return def.promise

};




module.exports = {
	commnentsList: commnentsList,
	addCommnent:addCommnent,
	getCommnentsByFilmId:getCommnentsByFilmId
}
