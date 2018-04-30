const twilioClient = require('../../../src/twilio/client')

describe('Twilio client', () => {

  it('exists', () => {
    expect(twilioClient).to.exist
  })

  it.skip('is an instance of Twilio', () => {
    expect(twilioClient).to.be.an.instanceOf(Twilio)
  })
})
