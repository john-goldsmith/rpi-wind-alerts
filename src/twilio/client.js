const { twilioAccountSid, twilioAuthToken } = require('../config')

/**
 * The configured Twilio client.
 *
 * @type {Twilio}
 */
const client = require('twilio')(twilioAccountSid, twilioAuthToken)

module.exports = client