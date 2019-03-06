const mongoose = require("mongoose");
const request = require("request");
const Film = require("./movieSchema.js");
const Q = require("q");


//return list of movies in JSON format form database
function moviesList () {

  let def = Q.defer();
	
  Film.find({}).exec()
      .then((movies) => def.resolve(movies))
      .catch((err) => def.reject(err));

  return def.promise;

}

function getBestRatings (){
  
  let def = Q.defer();

  Film.find({"imdbRating":{"$ne":"N/A"}}).sort({"imdbRating": -1}).limit(10).exec()
    .then((movies)=> def.resolve(movies))
    .catch((err) => def.reject(err));

  return def.promise;

}

function addMovie (data) {

  let dataToDb = JSON.parse(data);
  let movie = new Film(dataToDb);
  let def = Q.defer();

  movie.save()
    .then((dataToSave) => def.resolve(dataToSave))
    .catch((err) => def.reject(err)); 

  return def.promise;


}

//searching movies in database by ID
function getFilmById(id) {


  let def = Q.defer();

  Film.findById(id)
    .exec()
    .then((data) => def.resolve(data))
    .catch((error) => def.reject(error));   
 

  return def.promise;

  // Film.findById(id).exec((err, data) => {

   
  //   if (err){
  //     cb(err);
  //   } else {
  //     cb(null, data);
  //   }

  // });

}
  
//searching movies in database by movies title
function findMovieByTitle(title) {

  let def = Q.defer();

  Film.find({"Title":new RegExp(title + '.*', "ig")})
    .exec()
    .then((data) => {

      if (!data.length){
      
        def.resolve(false);
      
      } else {      
      
        def.resolve(data);
      
      }
    })
    .catch((error) => def.reject(error));  
 
  return def.promise;

}

	// Film.find({"Title":new RegExp(title + '.*', "ig")}).exec((err, movie) => {

  //    if (movie.length === 0) {
  //      cb(movie.length)
  //    } else {
  //      cb(movie)
  //    }
  
 //  });

//checking is movie title even exist and exist in database 
//sending it on POST method or geting movies data form external API 
function checkDataBase(title){


  let def = Q.defer();

      findMovieByTitle(title) 
        .then((movie) => {

          if(movie === false) {
        
            request.get({
              url: 'http://www.omdbapi.com/?t=' + title + '&apikey=' + process.env.YOUR_API_KEY,
              }, (error, response, body) => {
                if (error || response.statusCode !== 200) {
                  return def.reject(error);
              }
               
               let dataToDb = JSON.parse(body);

               if(dataToDb.Response === "False") {
                  def.reject({"Title": "Movie Title does not exist", "Response": "False"});

              } else {

                addMovie(body)
                  .then((dataToSave) => def.resolve(dataToSave)) 
                  .catch((err) => def.reject({"info":"data not Save"}));

                }

              });

          } else {

              def.resolve(movie);
      
          }
        });

  return def.promise;


    // calback version

    // findMovieByTitle(title, (movie) => {

    //   if (movie === 0) {
        
    //       request.get({
    //         url: 'http://www.omdbapi.com/?t=' + title + '&apikey=' + process.env.YOUR_API_KEY,
    //         }, (error, response, body) => {
    //           if (error || response.statusCode !== 200) {
    //             return callback(error || {statusCode: response.statusCode});
    //         }
             
    //          let dataToDb = JSON.parse(body);

    //          if(dataToDb.Response === "False") {
    //             callback({"Title": "Movie Title does not exist", "Response": "False"})
    //         } else {

    //           addMovie(body, (err, dataToSave) => {
    //               if (err){
    //                 error: "data not Save"
    //               } else {
    //                 callback(dataToSave);
    //               }
    //           });  
    //         }});


    //   } else {
    //     callback(movie)
    //   }

    // });

 
 }


module.exports = {
	moviesList: moviesList,
	getFilmById: getFilmById,
  checkDataBase:checkDataBase,
  getBestRatings: getBestRatings
};
