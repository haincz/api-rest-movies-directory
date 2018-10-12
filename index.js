const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const movies = require("./movies");
const commentsRouts = require("./api/comments");
const moviesRouts = require("./api/movies");
const app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/api/comments", commentsRouts);
app.use("/api/movies", moviesRouts);

app.get('/', (req, res) => {
  	

  	movies.moviesList((err, movies) => {
			
			res.render('home', {

	  		title: "Movies Database",
	  		movies: err? [] : movies

	  	});
  	
  	
  	});

	
});






app.listen(process.env.PORT || 8080, () => {
	console.log("app start")
});