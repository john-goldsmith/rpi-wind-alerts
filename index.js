require('dotenv').config()

const {
  windMphThreshold,
  wundergroundZipCode,
  relevantAlertTypes
} = require('./src/config')
const { forecastIsInFuture } = require('./src/weather-underground/util')
const { getAlerts, getForecast } = require('./src/weather-underground/api')
const { sendMessage } = require('./src/twilio/api')

/**
 * [forecastRules description]
 * @type {Array}
 */
const forecastRules = [
  {
    conditions: [
      forecast => forecastIsInFuture(forecast),
      forecast => forecast.maxwind.mph >= windMphThreshold
    ],
    body: forecast => `Max winds of ${forecast.maxwind.mph}mph ${forecast.maxwind.dir} for ${wundergroundZipCode} (avg. ${forecast.avewind.mph} ${forecast.avewind.dir}) on ${forecast.date.month}/${forecast.date.day}`
  }
]

/**
 * [sendAlertMessages description]
 * @return {Array<Promise<MessageInstance>>} [description]
 */
async function sendAlertMessages() {
  try {
    const alertsJson = await getAlerts()
    const relevantAlerts = alertsJson.alerts.filter(alert => relevantAlertTypes.includes(alert.type.toUpperCase()))
    return relevantAlerts.map(alert => {
      const body = `${alertTypes[alert.type.toUpperCase()]} for ${wundergroundZipCode} (expires ${alert.expires})`
      return sendMessage({ body })
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * [sendForecastMessages description]
 * @return {Array<Promise<MessageInstance>>} [description]
 */
async function sendForecastMessages() {
  try {
    const forecastJson = await getForecast()
    const { forecastday } = forecastJson.forecast.simpleforecast
    const forecastMessages = []
    forecastday.forEach(forecast => {
      forecastRules.forEach(rule => {
        const { conditions, body } = rule
        const conditionResults = conditions.map(condition => condition(forecast))
        const meetsAllConditions = conditionResults.every(result => result)
        if (meetsAllConditions) {
          const forecastMessage = sendMessage({ body: body(forecast) })
          forecastMessages.push(forecastMessage)
        }
      })
    })
    return forecastMessages
  } catch (err) {
    console.log(err)
  }
}

function main() {
  sendAlertMessages()
  sendForecastMessages()
}

main()