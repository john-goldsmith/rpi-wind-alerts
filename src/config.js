module.exports = {
  weatherUnderground: {
    apiBaseUrl: 'http://api.wunderground.com/api',
    relevantAlertTypes: process.env.WUNDERGROUND_ALERT_TYPES.split(',').map(type => type.trim()).map(type => type.toUpperCase()),
    relevantAlertTypesRaw: process.env.WUNDERGROUND_ALERT_TYPES,
    zipCode: process.env.WUNDERGROUND_ZIP_CODE,
    apiKey: process.env.WUNDERGROUND_API_KEY
  },
  twilio: {
    number: process.env.TWILIO_NUMBER,
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
  },
  windMphThreshold: parseInt(process.env.WIND_MPH_THRESHOLD),
  myNumber: process.env.MY_NUMBER
}
