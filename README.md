# comfy //  [maxcomfy.dev](https://maxcomfy.dev) 

<em>be sure to allow location services and refresh!</em>

<b>comfy</b> is a web application which suggests film and animation suggestions along with embedded trailers in real-time based on your local weather and time of day.


## Demo

![Demo](/img/reduced.gif)

## Features

- Displays film/anime information like description, rating, and release date in real-time
- Instantly embed YouTube trailers for the selected film without having to search for them
- Near-infinite forward and backward scrolling as well as reset functionality

## Technologies

- [Node.js](https://nodejs.org/en/) 
- [Express.js](https://expressjs.com/) 
- [Bulma](https://bulma.io)
- JavaScript
- CSS
- HTML5

## Development
This project leverages the OpenWeather API along with JavaScript's in navigator interface to fetch a user's local weather, mapping the data to an object containing various genre IDs. A request is made to the TMDb API with the matching IDs and ~80-100 results are returned depending on request parameters.  The result objects are excised of duplicates and randomly shuffled with a Fisher-Yates sorting algorithm. 

Scripting is done in JavaScript with vanilla DOM interaction whereas a Node-Express backend leverages API calls and serves static HTML to the user.


<span><em>this web application is ideally used on a 1080p+ resolution</em></small>


## License

MIT
