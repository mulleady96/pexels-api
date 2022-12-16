const request = require("request");

const PEXELS_API_KEY =
  "563492ad6f91700001000001be6ce15cdf1e45d18d2e722cb36a75a6";
const PEXELS_API_URL = "https://api.pexels.com/v1/";

function getRandomImage(query, callback) {
  const options = {
    url: PEXELS_API_URL + "curated?per_page=1&page=1",
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  };

  if (query) {
    options.url += "&query=" + encodeURIComponent(query);
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      if (data && data.photos && data.photos.length > 0) {
        const photo = data.photos[0];
        callback(null, photo.src.original);
      } else {
        callback(new Error("No photos found"));
      }
    } else {
      callback(new Error("Failed to fetch photos from Pexels API"));
    }
  });
}

module.exports = {
  getRandomImage: getRandomImage,
};
