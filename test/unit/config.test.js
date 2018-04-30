const config = require('../../src/config')

describe('Config', () => {

  it('exists', () => {
    expect(config).to.exist
  })

  it('is an object', () => {
    expect(config).to.an('object')
  })

  describe('Weather Underground properties', () => {

    it('exists', () => {
      expect(config.weatherUnderground).to.exist
    })

    it('is an object', () => {
      expect(config.weatherUnderground).to.be.an('object')
    })

    describe('relevantAlertTypes', () => {

      it('exists', () => {
        expect(config.weatherUnderground.relevantAlertTypes).to.exist
      })

      it('is an array', () => {
        const actual = config.weatherUnderground.relevantAlertTypes
        const expected = ['WND', 'HEA', 'FIR']
        expect(actual).to.be.an('array')
        expect(actual).to.deep.equal(expected)
      })

    })

    describe('relevantAlertTypesRaw', () => {

      it('exists', () => {
        expect(config.weatherUnderground.relevantAlertTypesRaw).to.exist
      })

      it('is a string', () => {
        const actual = config.weatherUnderground.relevantAlertTypesRaw
        const expected = 'WND,HEA,FIR'
        expect(actual).to.be.a('string')
        expect(actual).to.deep.equal(expected)
      })

    })

    describe('zipCode', () => {

      it('exists', () => {
        expect(config.weatherUnderground.zipCode).to.exist
      })

      it('is a string', () => {
        const actual = config.weatherUnderground.zipCode
        const expected = '90045'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

    describe('apiKey', () => {

      it('exists', () => {
        expect(config.weatherUnderground.apiKey).to.exist
      })

      it('is a string', () => {
        const actual = config.weatherUnderground.apiKey
        const expected = 'apikey123'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

  })

  describe('Twilio properties', () => {

    it('exists', () => {
      expect(config.twilio).to.exist
    })

    it('is an object', () => {
      expect(config.twilio).to.be.an('object')
    })

    describe('number', () => {

      it('exists', () => {
        expect(config.twilio.number).to.exist
      })

      it('is a string', () => {
        const actual = config.twilio.number
        const expected = '1234567890'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

    describe('accountSid', () => {

      it('exists', () => {
        expect(config.twilio.accountSid).to.exist
      })

      it('is a string', () => {
        const actual = config.twilio.accountSid
        const expected = 'AC01cd2e34f5g6hi789j01k2lm345n6o7p'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

    describe('authToken', () => {

      it('exists', () => {
        expect(config.twilio.authToken).to.exist
      })

      it('is a string', () => {
        const actual = config.twilio.authToken
        const expected = 'twilioauthtoken123'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

  })

  describe('Misc properties', () => {

    describe('windMphThreshold', () => {

      it('exists', () => {
        expect(config.windMphThreshold).to.exist
      })

      it('is a string', () => {
        const actual = config.windMphThreshold
        const expected = 999
        expect(actual).to.be.a('number')
        expect(actual).to.equal(expected)
      })

    })

    describe('myNumber', () => {

      it('exists', () => {
        expect(config.myNumber).to.exist
      })

      it('is a string', () => {
        const actual = config.myNumber
        const expected = '0987654321'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

  })

})
