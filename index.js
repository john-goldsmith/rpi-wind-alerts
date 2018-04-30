require('dotenv').config()
const config = require('./src/config')
const {
  windMphThreshold,
  weatherUnderground
} = require('./src/config')
const { forecastIsInFuture } = require('./src/weather-underground/util')
const { getAlerts, getForecast } = require('./src/weather-underground/api')
const { sendMessage } = require('./src/twilio/api')

/**
 * [forecastRules description]
 * @type {Array<Object>}
 */
const forecastRules = [
  {
    name: 'Future max winds exceeded',
    conditions: [
      forecast => forecastIsInFuture(forecast),
      forecast => forecast.maxwind.mph >= windMphThreshold
    ],
    body: forecast => `Max winds of ${forecast.maxwind.mph}mph ${forecast.maxwind.dir} for ${weatherUnderground.zipCode} (avg. ${forecast.avewind.mph} ${forecast.avewind.dir}) on ${forecast.date.month}/${forecast.date.day}`
  }
]

/**
 * [sendAlertMessages description]
 * @return {undefined}
 */
async function sendAlertMessages() {
  try {
    const alertsJson = await getAlerts()
    const relevantAlerts = alertsJson.alerts.filter(alert => relevantAlertTypes.includes(alert.type.toUpperCase()))
    if (!relevantAlerts.length) {
      console.info('No relevant alerts.')
    }
    relevantAlerts.forEach(alert => {
      const body = `${alertTypes[alert.type.toUpperCase()]} for ${weatherUnderground.zipCode} (expires ${alert.expires})`
      sendMessage({ body })
    })
  } catch (err) {
    console.error('Error sending alert messages', err)
  }
}

/**
 * [sendForecastMessages description]
 * @return {undefined}
 */
async function sendForecastMessages() {
  try {
    const forecastJson = await getForecast()
    const { forecastday } = forecastJson.forecast.simpleforecast
    forecastday.forEach(forecast => {
      forecastRules.forEach(rule => {
        const { conditions, body } = rule
        const conditionResults = conditions.map(condition => condition(forecast))
        const meetsAllConditions = conditionResults.every(result => result)
        if (meetsAllConditions) {
          console.info(`All conditions for rule "${rule.name}" met.`)
          sendMessage({ body: body(forecast) })
        }
      })
    })
  } catch (err) {
    console.error('Error sending forecast messages', err)
  }
}

function main() {
  sendAlertMessages()
  sendForecastMessages()
}

main()
