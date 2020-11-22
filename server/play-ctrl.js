const Play = require("./play-model");
const cities = require("./db/capitalCities.json");
const ObjectId = require("mongodb").ObjectId;

module.exports.postName = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a name",
    });
  }

  console.log("body", req.body);
  const name = req.body.value;
  const citiesArr = [];
  const cityNames = cities.capitalCities.map((c) => {
    citiesArr.push(c.capitalCity);
  });
  const current_city = citiesArr[Math.floor(Math.random() * citiesArr.length)];

  const play = new Play({
    name,
    score: 0,
    km_left: 1500,
    placed_cities: [current_city],
    current_city,
    prev_coords: [],
    distance: 0,
  });

  if (!play) {
    return res.status(400).json({ success: false, error: err });
  }

  play
    .save()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error saving record: " + err));
};

module.exports.placeCity = (req, res) => {
  const playerId = new ObjectId(req.body[1]);
  const coords = req.body[0];

  Play.findById(playerId)
    .then((response) => {
      // Get placed city's coords to measure distance
      const filteredCity = Object.values(cities)[0].filter(
        (city) => city.capitalCity === response.current_city
      );
      // console.log("filtered", filteredCity);

      // JavaScript version of the Haversine formula as implemented by the GeoDataSource.com
      distance = (lat1, lon1, lat2, lon2, unit) => {
        let radlat1 = (Math.PI * lat1) / 180;
        let radlat2 = (Math.PI * lat2) / 180;
        let radlon1 = (Math.PI * lon1) / 180;
        let radlon2 = (Math.PI * lon2) / 180;
        let theta = lon1 - lon2;
        let radtheta = (Math.PI * theta) / 180;
        let dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }
        return dist;
      };
      console.log(coords.lat);

      const measure = distance(
        Number(filteredCity[0].lat),
        Number(filteredCity[0].long),
        coords.lat,
        coords.lng,
        "K"
      );

      // Filter out already placed cities to generate a new random one
      let citiesArr = cities.capitalCities.map((c) => {
        return c.capitalCity;
      });

      citiesArr = citiesArr.filter((city) => {
        return !response.placed_cities.includes(city);
      });
      console.log(">>> ", citiesArr, response.placed_cities);

      const current_city =
        citiesArr[Math.floor(Math.random() * citiesArr.length)];
      response.current_city = current_city;
      response.placed_cities.push(current_city);
      // If distance btn cities is smaller than 50 send score
      // Otherwise, send distance in km
      if (Math.round(measure) <= 50) {
        response.score++;
      } else {
        const roundedDist = Math.round(measure);
        response.km_left -= roundedDist;
      }

      response.prev_coords = filteredCity[0];
      response.distance = measure;

      response
        .save()
        .then((updated) => res.json(updated))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
};

module.exports.findHighScore = (req, res) => {
  Play.find()
    .sort({ score: -1 })
    .limit(1)
    .then((highScore) => res.json(highScore));
};
