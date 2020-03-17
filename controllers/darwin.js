
const axios = require('axios');


/**
 * GET /huxley
 * List of API examples.
 */
exports.getHuxley = (req, res) => {
  res.render('huxley/index', {
    title: 'Darwin Examples'
  });
};

/**
 * GET /huxley/all/:crs
 * Darwin : Single Station : All
 */
exports.getAll = async (req, res, next) => {
  var stationCRS = req.params.crs
  //console.log(stationCRS)

  axios.get(`http://nrdf-1.apphb.com/all/${stationCRS}`)
  .then(response => {
    //console.log(response.data);
    res.render('nrdf/darwin/multiple',{
        title: 'Darwin Schedules - Arrivals & Departures',
        stationName:response.data.locationName,
        trainServices: response.data.trainServices
    })
  })
  .catch(error => {
    console.log(error);
  });
};

/**
 * GET /huxley/delay/:crs
 * Darwin : Single Station : Delay
 */
exports.getDelay = async (req, res, next) => {
    var stationCRS = req.params.crs
    //console.log(stationCRS)
  
    axios.get(`http://nrdf-1.apphb.com/delay/${stationCRS}`)
    .then(response => {
      //console.log(response.data);
      res.render('nrdf/darwin/multiple',{
          title: 'Darwin Schedules - Current Delay',
          stationName:response.data.locationName,
          trainServices: response.data.trainServices
      })
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getTrain = async (req, res, next) => {
    var serviceID = req.params.serviceID
    //console.log(serviceID)
  
    axios.get(`http://nrdf-1.apphb.com/service/${serviceID}`)
    .then(response => {
      //console.log(response.data);
      //console.log(response.data.previousCallingPoints[0]);
      res.render('nrdf/darwin/single',{
          title: `Darwin Schedule`,
          previousStations:response.data.previousCallingPoints[0].callingPoint,
          currentStation:response.data,
          nextStations:response.data.subsequentCallingPoints[0].callingPoint,
      })
    })
    .catch(error => {
      //console.log(error);
    });
  };