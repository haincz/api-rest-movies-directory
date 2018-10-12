<h3>Demo: https://stormy-mesa-43337.herokuapp.com/</h3>
<h3>Api Documentation: https://stormy-mesa-43337.herokuapp.com/api-documentation</h3>
<h3>How to Instal: https://stormy-mesa-43337.herokuapp.com/how-to-install </h3>

# api-rest-movies-directory
simple REST API - a basic movie database interacting with external API

# Assumptions
<h3>POST /api/movies:</h3>
			<p>
				<ul>
					<li>Request body should contain only movie title, and its presence should be validated. </li>
					<li>Based on passed title, other movie details should be fetched from http://www.omdbapi.com/- and saved to application database.</li>
					<li>Request response should include full movie object, along with all data fetched from external API.</li>
				</ul>
			</p>

<h3>GET /api/movies:</h3>
			<p>
				<ul>
					<li>Should fetch list of all movies already present in application database.</li>
				</ul>
			</p>

<h3>POST /api/comments:</h3>

  <p>
		<ul>
					<li>Request body should contain ID of movie already present in database, and comment text body. </li>
					<li>Comment should be saved to application database and returned in request response.</li>
				</ul>
			</p>
		<h3>GET /api/comments:</h3>
			<p>
				<ul>
					<li>Should fetch list of all comments present in application database. Should allow filtering comments by associated movie, by passing its ID.</li>
				</ul>
			</p>

# Endpoints
<h2>Endpoints</h2>
<h3>Method: POST /api/movies</h3>
		<p>should contain in body {"Title":"Movie_Title"}. "Title" must be a String and Movie_Title must be a String.</p>
			<p>should contain header: Content-Type: application/json</p>
			<p><strong>Post Body Example</strong></p>
			<code>
				<p>
					{
						"Title":"Batman"
					}
				</p>
			</code>
<p><strong>Responses example succes:</strong></p>
			<code>
				<p>
			 		[ { "_id": "5bb207ad0c198c1bf8f85f43", "Title": "Sex and the City", "Year": "2008", "Rated": "R", "Released": "30 May 2008", "Runtime": "145 min", "Genre": "Comedy, Drama, Romance", "Director": "Michael Patrick King", "Writer": "Michael Patrick King, Candace Bushnell (book), Darren Star (television series creator)", "Actors": "Sarah Jessica Parker, Kim Cattrall, Kristin Davis, Cynthia Nixon", "Plot": "A New York City writer on sex and love is finally getting married to her Mr. Big. But her three best girlfriends must console her after one of them inadvertently leads Mr. Big to jilt her.", "Language": "English", "Country": "USA", "Awards": "2 wins & 12 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMzYxMjM3OF5BMl5BanBnXkFtZTcwNjg2OTA3MQ@@._V1_SX300.jpg", "Metascore": "53", "imdbRating": "5.6", "imdbVotes": "107,289", "imdbID": "tt1000774", "Type": "movie", "DVD": "23 Sep 2008", "BoxOffice": "$152,595,674", "Production": "Warner Bros. Pictures", "Website": "http://www.sexandthecitymovie.com/", "Response": "True", "__v": 0, "Ratings": [ { "Source": "Internet Movie Database", "Value": "5.6/10" }, { "Source": "Rotten Tomatoes", "Value": "50%" }, { "Source": "Metacritic", "Value": "53/100" } ] } ]
			 	</p>
			 </code>
				<p><strong>Responses example False:</strong></p> 
				<code>
					<p>{"Title": "Movie Title does not exist", "Response": "False"}</p>
				</code>
<h3>Method: GET /api/movies</h3>
			<p>fetch list of all movies already present in application database.</p>
			<p>should contain header: Content-Type: application/json</p>
		<h3>Method: GET /api/movies/id</h3>
			<p>fetch movie detail by movie id in application database.</p>
			<p>should contain header: Content-Type: application/json</p>
			<p><strong>Responses example succes:</strong></p>
			<code>
				<p>
			 		[ { "_id": "5bb207ad0c198c1bf8f85f43", "Title": "Sex and the City", "Year": "2008", "Rated": "R", "Released": "30 May 2008", "Runtime": "145 min", "Genre": "Comedy, Drama, Romance", "Director": "Michael Patrick King", "Writer": "Michael Patrick King, Candace Bushnell (book), Darren Star (television series creator)", "Actors": "Sarah Jessica Parker, Kim Cattrall, Kristin Davis, Cynthia Nixon", "Plot": "A New York City writer on sex and love is finally getting married to her Mr. Big. But her three best girlfriends must console her after one of them inadvertently leads Mr. Big to jilt her.", "Language": "English", "Country": "USA", "Awards": "2 wins & 12 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMzYxMjM3OF5BMl5BanBnXkFtZTcwNjg2OTA3MQ@@._V1_SX300.jpg", "Metascore": "53", "imdbRating": "5.6", "imdbVotes": "107,289", "imdbID": "tt1000774", "Type": "movie", "DVD": "23 Sep 2008", "BoxOffice": "$152,595,674", "Production": "Warner Bros. Pictures", "Website": "http://www.sexandthecitymovie.com/", "Response": "True", "__v": 0, "Ratings": [ { "Source": "Internet Movie Database", "Value": "5.6/10" }, { "Source": "Rotten Tomatoes", "Value": "50%" }, { "Source": "Metacritic", "Value": "53/100" } ] } ]
			 	</p>
			 </code>
		<h3>Method: GET /api/comments</h3>
			<p>fetch list of all comments already present in application database.</p>
			<p>should contain header: Content-Type: application/json</p>
		<h3>Method: POST /api/comments</h3>
			<p>Request body should contain ID of movie in string, already present in database, author in String and comment text body as a String.</p>
			<p><strong>Example of request body:</strong></p>
				<code>
					<p>
					{ "film_id":"5bb207ad0c198c1bf8f85f43", "author": "String", "commenntContent":"String" }
					</p>
				</code>	
			<p><strong>Example of request body succes:</strong><p>
				<p>
					<code>
						{ "film_id":"5bb12b78fb6fc01d131d7509", "author": "Joseph Cucumber", "commenntContent":"Etiam venenatis iaculis ullamcorper. In hac habitasse platea dictumst. In ipsum tellus, sodales vitae porttitor et, vestibulum vel nisi. Cras feugiat ex libero, et imperdiet leo rutrum volutpat. Sed gravida nibh turpis, nec semper metus ornare mattis. Nam laoreet malesuada feugiat. Ut tincidunt leo sed nulla aliquam, quis efficitur quam ullamcorper. Integer vestibulum lacinia ex nec consectetur. Vestibulum eget tristique lorem, in cursus turpis. Duis quis tincidunt purus, ut posuere diam. Mauris convallis massa nec leo vestibulum malesuada. Proin imperdiet magna tempus felis placerat dignissim. Pellentesque sed accumsan metus, eu mattis tortor. Proin a augue viverra tortor gravida scelerisque. Praesent sodales ac purus vitae efficitur." }
					</code>
				</p>
			<h3>Method: GET /api/moviecomments/id</h3>
				<p>fetch comments by associated movie.<p>
				<p>should contain header: Content-Type: application/json</p>
				<p><strong>Example of request body succes:</strong></p>
				<p>					<code>
		[{"_id":"5bb3c4dbfb6fc019622173a0","film_id":"5bb12b78fb6fc01d131d7509","author":"Andrew Nowak","commenntContent":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum erat arcu, quis congue leo volutpat eu. Aenean cursus leo sed nunc ornare, mattis suscipit massa imperdiet. Donec at placerat nulla. Nunc mollis tempor justo vel sagittis. Mauris non mi consectetur risus bibendum convallis. Morbi eget dui efficitur, placerat velit id, venenatis mauris. Proin sit amet ultrices purus. Aenean a suscipit elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tempor dolor rhoncus tristique molestie. Aenean nec erat non nisi semper laoreet vel quis enim."},{"_id":"5bb3ccf6e3baf92c1c9ee695","film_id":"5bb12b78fb6fc01d131d7509","author":"Joseph Cucumber","commenntContent":"Morbi eu purus tincidunt, accumsan metus mattis, pretium libero. Pellentesque auctor diam non lacus dignissim placerat. Etiam id mattis justo. Aenean consectetur velit eu nisl bibendum, eu faucibus mauris mattis. Integer dignissim luctus dui, ut bibendum est aliquam in. Phasellus convallis ullamcorper lorem eu dignissim. Aenean id neque non lectus aliquet venenatis placerat vitae lorem. Etiam magna magna, tincidunt ac porttitor sed, volutpat vel elit. Duis nibh sem, porttitor eget feugiat eu, mattis vel nisi. Donec aliquet tincidunt ligula, nec condimentum diam commodo non. Suspendisse vitae lacus arcu. Nunc a arcu arcu. In aliquam in tortor malesuada tempus. Vestibulum ante mauris, lacinia non tortor sit amet, dictum hendrerit mauris. Aliquam lacinia porttitor quam, non consectetur lacus semper quis. Duis ullamcorper placerat enim, sed placerat lacus dapibus sed.","__v":0},{"_id":"5bb3dbf55a519a0015edecef","film_id":"5bb12b78fb6fc01d131d7509","author":"Joseph Cucumber","commenntContent":"Etiam venenatis iaculis ullamcorper. In hac habitasse platea dictumst. In ipsum tellus, sodales vitae porttitor et, vestibulum vel nisi. Cras feugiat ex libero, et imperdiet leo rutrum volutpat. Sed gravida nibh turpis, nec semper metus ornare mattis. Nam laoreet malesuada feugiat. Ut tincidunt leo sed nulla aliquam, quis efficitur quam ullamcorper. Integer vestibulum lacinia ex nec consectetur. Vestibulum eget tristique lorem, in cursus turpis. Duis quis tincidunt purus, ut posuere diam. Mauris convallis massa nec leo vestibulum malesuada. Proin imperdiet magna tempus felis placerat dignissim. Pellentesque sed accumsan metus, eu mattis tortor. Proin a augue viverra tortor gravida scelerisque. Praesent sodales ac purus vitae efficitur.","__v":0}]
					</code>
				</p>
		<h2>DataBase</h2>
			<p>DataBase is working on MongoDB. Aplication is using Moongose driver and uses Mlab</p>
# How to Install
Clone repository from GitHub

Run Npm Install

Create your database on MongoDb or use Mlab. The Collection names should be "commnents" for commnents API and "film" fo Movie API
