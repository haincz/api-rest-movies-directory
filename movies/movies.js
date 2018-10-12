const mongoose = require("mongoose");
const request = require("request");

const DB_USER = "moviescomentsapi";
const DB_PASS = "qwe123";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds215563.mlab.com:15563/movies_and_comments_db`);


var schema = new mongoose.Schema ({
  "Title": String,
  "Year": String,
    "Rated": String,
    "Released": String,
    "Runtime": String,
    "Genre": String,
    "Director": String,
    "Writer":String,
    "Actors": String,
    "Plot": String,
    "Language": String,
    "Country": String,
    "Awards": String,
    "Poster": String,
    "Ratings": Array,
    "Metascore": String,
    "imdbRating": String,
    "imdbVotes": String,
    "imdbID": String,
    "Type": String,
    "DVD": String,
    "BoxOffice": String,
    "Production": String,
    "Website": String,
    "Response": String
});

var Film = mongoose.model("Film", schema);

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

  var dataToDb = JSON.parse(data);
  var movie = new Film(dataToDb);

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
      cb(data);
    }

  });


};

//searching movies in database by movies title
function findMovieByTitle(title, cb) {


	Film.find({"Title":new RegExp(title + '.*', "ig")}).exec((err,movie) => {

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

      if (movie === 0){
        var yourApiKey = "7d4422f4";

          request.get({
            url: 'http://www.omdbapi.com/?t=' + title + '&apikey=' + yourApiKey,
            }, (error, response, body) => {
              if (error || response.statusCode !== 200) {
                return callback(error || {statusCode: response.statusCode});
            }
             

             var dataToDb = JSON.parse(body);

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
