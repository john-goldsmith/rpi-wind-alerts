const config = require('../../src/config')

describe('Config', () => {

  it('exists', () => {
    expect(config).to.exist
  })

  it('is an object', () => {
    expect(config).to.an('object')
  })

  describe('properties', () => {

    describe('relevantAlertTypes', () => {

      it('exists', () => {
        expect(config.relevantAlertTypes).to.exist
      })

      it('is an array', () => {
        const actual = config.relevantAlertTypes
        const expected = ['WND', 'HEA', 'FIR']
        expect(actual).to.be.an('array')
        expect(actual).to.deep.equal(expected)
      })

    })

    describe('zipCode', () => {

      it('exists', () => {
        expect(config.zipCode).to.exist
      })

      it('is a string', () => {
        const actual = config.zipCode
        const expected = '90045'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

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

    describe('twilioNumber', () => {

      it('exists', () => {
        expect(config.twilioNumber).to.exist
      })

      it('is a string', () => {
        const actual = config.twilioNumber
        const expected = '1234567890'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

    describe('twilioAccountSid', () => {

      it('exists', () => {
        expect(config.twilioAccountSid).to.exist
      })

      it('is a string', () => {
        const actual = config.twilioAccountSid
        const expected = 'AC01cd2e34f5g6hi789j01k2lm345n6o7p'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

    describe('wuApiKey', () => {

      it('exists', () => {
        expect(config.wuApiKey).to.exist
      })

      it('is a string', () => {
        const actual = config.wuApiKey
        const expected = 'apikey123'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })

    describe('twilioAuthToken', () => {

      it('exists', () => {
        expect(config.twilioAuthToken).to.exist
      })

      it('is a string', () => {
        const actual = config.twilioAuthToken
        const expected = 'twilioauthtoken123'
        expect(actual).to.be.a('string')
        expect(actual).to.equal(expected)
      })

    })


  })


})