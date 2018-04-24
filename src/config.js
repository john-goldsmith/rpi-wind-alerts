module.exports = {
  relevantAlertTypes: process.env.WUNDERGROUND_ALERT_TYPES.split(',').map(type => type.trim()).map(type => type.toUpperCase()),
  zipCode: process.env.WUNDERGROUND_ZIP_CODE,
  windMphThreshold: parseInt(process.env.WIND_MPH_THRESHOLD),
  myNumber: process.env.MY_NUMBER,
  wuApiKey: process.env.WUNDERGROUND_API_KEY,
  twilioNumber: process.env.TWILIO_NUMBER,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN
}