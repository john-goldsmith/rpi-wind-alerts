const fetch = require('node-fetch')
const { weatherUnderground } = require('../config')
const { apiBaseUrl, apiKey, zipCode } = weatherUnderground

/**
 * The Weather Underground API endpoint for alerts.
 *
 * @type {String}
 * @see https://www.wunderground.com/weather/api/d/docs?d=data/alerts
 */
const wuAlertsEndpoint = `${apiBaseUrl}/${apiKey}/alerts/q/${zipCode}.json`

/**
 * The Weather Underground API endpoint for forecasts.
 *
 * @type {String}
 * @see https://www.wunderground.com/weather/api/d/docs?d=data/forecast
 */
const wuForecastEndpoint = `${apiBaseUrl}/${apiKey}/forecast/q/${zipCode}.json`

/**
 * Returns the short name description, expiration time and a long text
 * description of a severe alert, if one has been issued for the searched
 * upon location.
 *
 * @return {Promise<Object>}
 * @see https://www.wunderground.com/weather/api/d/docs?d=data/alerts
 */
async function getAlerts() {
  const response = await fetch(wuAlertsEndpoint)
  return response.json()
}

/**
 * Returns a summary of the weather for the next 3 days. This includes
 * high and low temperatures, a string text forecast and the conditions.
 *
 * @return {Promise<Object>}
 * @see https://www.wunderground.com/weather/api/d/docs?d=data/forecast
 */
async function getForecast() {
  const response = await fetch(wuForecastEndpoint)
  return response.json()
}

module.exports = {
  getAlerts,
  getForecast
}
