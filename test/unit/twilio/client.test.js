const twilio = require('../../../src/twilio/client')

describe('Twilio client', () => {

  it('exists', () => {
    expect(twilio).to.exist
  })

  it.skip('is an instance of Twilio', () => {
    expect(twilio).to.be.an.instanceOf(Twilio)
  })
})