const mongoose = require("mongoose");
const request = require("request");
const Film = require("./movieSchema.js")


//return list of movies in JSON format form database
function moviesList (callback) {
	
  Film.find({}).exec((err, movies) => {
      if (err){
        callback(err);
      } else {
        callback(null, movies);
      }
  })

};


function addMovie (data, cb) {

  let dataToDb = JSON.parse(data);
  let movie = new Film(dataToDb);

  movie.save((err, dataToSave) => {

    if(err){
      cb (err)
    } else {
      cb(null, dataToSave);
    }

  });

}

//searching movies in database by ID
function getFilmById(id, cb) {

  Film.findById(id).exec((err, data) => {

   
    if (err){
      cb(err);
    } else {
      cb(null, data);
    }

  });


};

//searching movies in database by movies title
function findMovieByTitle(title, cb) {


	Film.find({"Title":new RegExp(title + '.*', "ig")}).exec((err, movie) => {

    if (movie.length === 0) {
      cb(movie.length)
    } else {
      cb(movie)
    }
  
  });

};

//checking is movie title even exist and exist in database 
//sending it on POST method or geting movies data form external API 
function checkDataBase(title, callback){

    findMovieByTitle(title, (movie) => {

      if (movie === 0) {
        
          request.get({
            url: 'http://www.omdbapi.com/?t=' + title + '&apikey=' + process.env.YOUR_API_KEY,
            }, (error, response, body) => {
              if (error || response.statusCode !== 200) {
                return callback(error || {statusCode: response.statusCode});
            }
             
             let dataToDb = JSON.parse(body);

             if(dataToDb.Response === "False") {
                callback({"Title": "Movie Title does not exist", "Response": "False"})
            } else {

              addMovie(body, (err, dataToSave) => {
                  if (err){
                    error: "data not Save"
                  } else {
                    callback(dataToSave);
                  }
              });  
            }});


      } else {
        callback(movie)
      }

    });

 
 };


module.exports = {
	moviesList: moviesList,
	getFilmById: getFilmById,
	checkDataBase:checkDataBase
}
