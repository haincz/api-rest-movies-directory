const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const movies = require("./movies");
const commentsRouts = require("./api/comments");
const moviesRouts = require("./api/movies");
const app = express();
const mongoose = require("mongoose");


mongoose.connect(
  "mongodb://" +
    process.env.MONGO_DB_USER + ":" + process.env.MONGO_DB_PASS + 
    "@ds215563.mlab.com:15563/movies_and_comments_db",
  {
    useMongoClient: true
  }
);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/comments", commentsRouts);
app.use("/api/movies", moviesRouts);


app.get('/', (req, res) => {
  	
	movies.moviesList()
		.then((data) => {
			res.render('home', 
			{
				title: "Movies Database",
	  			movies: data
	  		})
	  	})
});

app.use((req, res, next) => {

	const error = new Error("Not Found");
	error.status = 404;
	next(error);

});


app.use((error, req, res, next) => {

	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});

});


app.listen(process.env.PORT || 8080, () => {
	console.log("app start")
});