require('dotenv').config();

var request = require('request'),
    twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
    wuEndpointBase = 'http://api.wunderground.com/api/',
    wuAlertsEndpoint = wuEndpointBase + process.env.WUNDERGROUND_API_KEY + '/alerts/q/' + process.env.WUNDERGROUND_ZIP_CODE + '.json',
    wuForecastEndpoint = wuEndpointBase + process.env.WUNDERGROUND_API_KEY + '/forecast/q/' + process.env.WUNDERGROUND_ZIP_CODE + '.json',
    wuConditionsEndpoint = wuEndpointBase + process.env.WUNDERGROUND_API_KEY + '/conditions/q/' + process.env.WUNDERGROUND_ZIP_CODE + '.json';

request(wuAlertsEndpoint, function (err, response, body) {
  if (!err && response.statusCode === 200) {
    body = JSON.parse(body);
    if (body.alerts.length) {
      for (var i = 0; i < body.alerts.length; i++) {
        if (body.alerts[i].type === 'WND') {
          twilio.sendMessage({
            to: process.env.MY_NUMBER,
            from: process.env.TWILIO_NUMBER,
            body: 'Wind advisory in effect until ' + body.alerts[i].expires
          }, function (err, response) {
            if (err) {
              console.log('Twilio error:', err);
            } else {
              console.log('Twilio success:', response);
            }
          });
          break;
        }
      }
    }
  } else {
    console.log('Weather Underground error:', err, response);
  }
});

request(wuForecastEndpoint, function (err, response, body) {
  if (!err && response.statusCode === 200) {
    body = JSON.parse(body);
    var now = new Date();
    for (var i = 0; i < body.forecast.simpleforecast.forecastday.length; i++) {
      var forecast = body.forecast.simpleforecast.forecastday[i];
      if ( (forecast.date.day === now.getDate() && forecast.date.hour > now.getHours()) || (forecast.date.day > now.getDate()) ) { // Ignore forecasts in the past
        if (forecast.maxwind.mph >= parseInt(process.env.WIND_MPH_THRESHOLD)) {
          twilio.sendMessage({
            to: process.env.MY_NUMBER,
            from: process.env.TWILIO_NUMBER,
            body: 'Max winds ' + forecast.maxwind.mph + 'mph ' + forecast.maxwind.dir + ' (avg. ' + forecast.avewind.mph + ' ' + forecast.avewind.dir + ') on ' + forecast.date.month + '/' + forecast.date.day
          }, function (err, response) {
            if (err) {
              console.log('Twilio error:', err);
            } else {
              console.log('Twilio success:', response);
            }
          });
          break; // Discard everything after the immediate next forecast where the conditions are met
        }
      }
    }
  } else {
    console.log('Weather Underground error:', err, response);
  }
});