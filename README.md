# comfy // [maxcomfy.dev](https://maxcomfy.dev)

<em>be sure to allow location services and refresh!</em>

<b>comfy</b> is a web application which suggests film and animation suggestions along with embedded trailers in real-time based on your local weather and time of day.

## Demo

![Demo](/img/reduced.gif)

## Features

- Displays film/anime information like description, rating, and release date in real-time
- Instantly embed YouTube trailers for the selected film without having to search for them
- Near-infinite forward and backward scrolling as well as reset functionality

## Technologies

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Docker](https://docker.com/)
- [Google Cloud](https://cloud.google.com/)
- [MaterialUI](https://mui.com/)
- JavaScript
- CSS
- HTML5

## Development

This project leverages the OpenWeather API along with JavaScript's built-in navigator interface to fetch a user's local weather and time, mapping the data to an object containing various genre IDs. A request is made to the TMDb API with the matching IDs and dozens of films of various genres are returned depending on request parameters. The result objects are excised of duplicates and randomly shuffled with a Fisher-Yates sorting algorithm and then returned to the front-end.

The front-end application is built in React.js while a Node-Express server leverages API calls and serves back data to the front-end.

<span><em>this web application is ideally used on a 1080p+ resolution</em></small>

## License

MIT
