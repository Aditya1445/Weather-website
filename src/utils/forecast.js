const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=45db29bafd6b470c90094910f7e92536&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      // console.log(
      //   `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees outside. There is a ${current.precip}% chance of rain. It feels like ${current.feelslike} degrees outside`
      // );
      callback(
        undefined,
        // {
        //     description:body.current.weather_descriptions,
        //     Temperature : body.current.temperature,
        //     Precipitation : body.current.precip,
        //     Location : body.location.name
        // }
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees outside. There is a ${body.current.precip}% chance of rain. It feels like ${body.current.feelslike} degrees outside.
        The humidity is ${body.current.humidity} %.`
      );
    }
  });
};

module.exports = forecast;
