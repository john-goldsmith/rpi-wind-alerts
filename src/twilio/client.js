const { twilio } = require('../config')

/**
 * The configured Twilio client.
 *
 * @type {Twilio}
 */
const twilioClient = require('twilio')(twilio.accountSid, twilio.authToken)

module.exports = twilioClient
