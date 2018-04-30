const twilioClient = require('./client')
const { myNumber, twilio } = require('../config')

/**
 * Calls the Twilio API to send a message.
 *
 * @param  {Object} options
 * @param  {String} [options.to]   The message recipient phone number. Defaults to the `MY_NUMBER` environment variable.
 * @param  {String} [options.from] The message sender phone number. Defaults to the `TWILIO_NUMBER` environment variable.
 * @param  {String} [options.body] The message text. Defaults to an empty string.
 * @return {Promise<MessageInstance>}
 * @see https://www.twilio.com/docs/libraries/node
 */
function sendMessage({ to = myNumber, from = twilio.number, body = ''}) {
  twilioClient.messages.create({ to, from, body })
  console.info(`Sent message "${body}" to ${to} via ${from}.`)
}

module.exports = {
  sendMessage
}
