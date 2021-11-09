const getPosition = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export const getCoordinates = async () => {
  const res = await getPosition();
  const { latitude, longitude } = res.coords;

  return { lat: latitude, lon: longitude };
};

export const genres = {
  35: "Comedy",
  16: "Animation",
  10479: "Music",
  10749: "Romance",
  12: "Adventure",
  37: "Western",
  53: "Thriller",
  28: "Action",
  27: "Horror",
  18: "Drama",
  14: "Fantasy",
  36: "History",
  10752: "War",
  878: "SciFi",
  99: "Documentary",
  80: "Crime",
  9648: "Mystery",
  10751: "Family",
};
