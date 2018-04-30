const nock = require('nock')
const util = require('../../../src/weather-underground/api')
const { weatherUnderground } = require('../../../src/config')
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi

describe('Weather Underground API', () => {

  describe('getAlerts', () => {

    before(() => {
      /**
       * The following intercepts all HTTP GET requests so that
       * the Weather Underground API doesn't actually get hit while
       * running unit tests.
       */
      nock(urlRegExp).persist().get(`/api/${weatherUnderground.apiKey}/alerts/q/${weatherUnderground.zipCode}.json`).reply(200, {alerts: true})
    })

    after(() => {
      nock.cleanAll()
    })

    it('exists', () => {
      expect(util.getAlerts).to.exist
    })

    it('is a function', () => {
      expect(util.getAlerts).to.be.a('function')
    })

    it('returns a JSON response', async () => {
      const actual = await util.getAlerts()
      const expected = {alerts: true}
      expect(actual).to.deep.equal(expected)
    })

  })

  describe('getForecast', () => {

    before(() => {
      /**
       * The following intercepts all HTTP GET requests so that
       * the Weather Underground API doesn't actually get hit while
       * running unit tests.
       */
      nock(urlRegExp).persist().get(`/api/${weatherUnderground.apiKey}/forecast/q/${weatherUnderground.zipCode}.json`).reply(200, {forecast: true})
    })

    after(() => {
      nock.cleanAll()
    })

    it('exists', () => {
      expect(util.getForecast).to.exist
    })

    it('is a function', () => {
      expect(util.getForecast).to.be.a('function')
    })

    it('returns a JSON response', async () => {
      const actual = await util.getForecast()
      const expected = {forecast: true}
      expect(actual).to.deep.equal(expected)
    })

  })

})
