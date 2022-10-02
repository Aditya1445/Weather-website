const request = require('request');
const geoCode = (address, callback) => {
    const url = // for destructuring the property name must be url no custom names
      "http://api.positionstack.com/v1/forward?access_key=e36e227f01f43307f43aa3f9f92b9e98&query=" +
      address;
  
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (body.data.length === 0) {
        callback("No matching results", undefined);
      } else {
        callback(undefined, {
          latitude:body.data[0].latitude,
          longitude:body.data[0].longitude,
          location : body.data[0].label
        })
      }
    });
  };
  
  


  module.exports = geoCode