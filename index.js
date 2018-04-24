require('dotenv').config()

const request = require('request')
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const wuEndpointBase = 'http://api.wunderground.com/api/'
const wuAlertsEndpoint = wuEndpointBase + process.env.WUNDERGROUND_API_KEY + '/alerts/q/' + process.env.WUNDERGROUND_ZIP_CODE + '.json'
const wuForecastEndpoint = wuEndpointBase + process.env.WUNDERGROUND_API_KEY + '/forecast/q/' + process.env.WUNDERGROUND_ZIP_CODE + '.json'
const wuConditionsEndpoint = wuEndpointBase + process.env.WUNDERGROUND_API_KEY + '/conditions/q/' + process.env.WUNDERGROUND_ZIP_CODE + '.json'

request(wuAlertsEndpoint, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    body = JSON.parse(body)
    if (body.alerts.length) {
      for (var i = 0; i < body.alerts.length; i++) {
        if (body.alerts[i].type === 'WND') {
          twilio.messages.create({
            to: process.env.MY_NUMBER,
            from: process.env.TWILIO_NUMBER,
            body: 'Wind advisory in effect until ' + body.alerts[i].expires
          }, (err, response) => {
            if (err) {
              console.log('Twilio error:', err)
            } else {
              console.log('Twilio success:', response)
            }
          })
          break
        }
      }
    }
  } else {
    console.log('Weather Underground error:', err, response)
  }
});

request(wuForecastEndpoint, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    body = JSON.parse(body)
    var now = new Date()
    for (var i = 0; i < body.forecast.simpleforecast.forecastday.length; i++) {
      var forecast = body.forecast.simpleforecast.forecastday[i];
      if ( (forecast.date.day === now.getDate() && forecast.date.hour > now.getHours()) || (forecast.date.day > now.getDate()) ) { // Ignore forecasts in the past
        if (forecast.maxwind.mph >= parseInt(process.env.WIND_MPH_THRESHOLD)) {
          twilio.messages.create({
            to: process.env.MY_NUMBER,
            from: process.env.TWILIO_NUMBER,
            body: 'Max winds ' + forecast.maxwind.mph + 'mph ' + forecast.maxwind.dir + ' (avg. ' + forecast.avewind.mph + ' ' + forecast.avewind.dir + ') on ' + forecast.date.month + '/' + forecast.date.day
          }, function (err, response) {
            if (err) {
              console.log('Twilio error:', err)
            } else {
              console.log('Twilio success:', response)
            }
          });
          break // Discard everything after the immediate next forecast where the conditions are met
        }
      }
    }
  } else {
    console.log('Weather Underground error:', err, response)
  }
})