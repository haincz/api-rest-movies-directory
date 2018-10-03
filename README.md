# api-rest-movies-directory
 simple REST API - a basic movie database interacting with external API

# Assumptions

POST /api/movies:

Request body should contain only movie title, and its presence should be validated.
Based on passed title, other movie details should be fetched from http://www.omdbapi.com/- and saved to application database.
Request response should include full movie object, along with all data fetched from external API.

GET /api/movies:

Should fetch list of all movies already present in application database.

# Endpoints

Method: POST /api/movies 

should contain in body {"Title":"Movie_Title"}. "Title" must be a string and Movie_Title must be a string.

should contain header: Content-Type: application/json

Responses example succes:
[
    {
        "_id": "5bb207ad0c198c1bf8f85f43",
        "Title": "Sex and the City",
        "Year": "2008",
        "Rated": "R",
        "Released": "30 May 2008",
        "Runtime": "145 min",
        "Genre": "Comedy, Drama, Romance",
        "Director": "Michael Patrick King",
        "Writer": "Michael Patrick King, Candace Bushnell (book), Darren Star (television series creator)",
        "Actors": "Sarah Jessica Parker, Kim Cattrall, Kristin Davis, Cynthia Nixon",
        "Plot": "A New York City writer on sex and love is finally getting married to her Mr. Big. But her three best girlfriends must console her after one of them inadvertently leads Mr. Big to jilt her.",
        "Language": "English",
        "Country": "USA",
        "Awards": "2 wins & 12 nominations.",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMzYxMjM3OF5BMl5BanBnXkFtZTcwNjg2OTA3MQ@@._V1_SX300.jpg",
        "Metascore": "53",
        "imdbRating": "5.6",
        "imdbVotes": "107,289",
        "imdbID": "tt1000774",
        "Type": "movie",
        "DVD": "23 Sep 2008",
        "BoxOffice": "$152,595,674",
        "Production": "Warner Bros. Pictures",
        "Website": "http://www.sexandthecitymovie.com/",
        "Response": "True",
        "__v": 0,
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "5.6/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "50%"
            },
            {
                "Source": "Metacritic",
                "Value": "53/100"
            }
        ]
    }
]

Responses example False:
{
    "Title": "Movie Title does not exist",
    "Response": "False"
}


Method: GET /api/movies 

should contain header: Content-Type: application/json

fetch list of all movies already present in application database.

Method: GET /api/movies/id

should contain header: Content-Type: application/json

fetch movie detail by movie id in application database.



