const util = require('../../../src/weather-underground/util')

describe('Weather Underground util', () => {

  describe('forecastIsInFuture', () => {

    it('exists', () => {
      expect(util.forecastIsInFuture).to.exist
    })

    it('is a function', () => {
      expect(util.forecastIsInFuture).to.be.a('function')
    })

    context('when no forecast object is provided', () => {

      it('returns false', () => {
        const actual = util.forecastIsInFuture()
        const expected = false
        expect(actual).to.equal(expected)
      })

    })

    context('when an invalid forecast object is provided', () => {

      it('returns false', () => {
        const forecast = null
        const actual = util.forecastIsInFuture(forecast)
        const expected = false
        expect(actual).to.equal(expected)
      })

    })

    context('when a valid forecast object is provided', () => {

      context('when the day is the same but the hour is in the future', () => {

        it('returns true', () => {
          /**
           * @todo Stub the Date class; this is hacky but ensures that the
           *       function will always return true
           */
          const now = new Date()
          const forecast = {
            date: {
              day: now.getDate(),
              hour: 25
            }
          }
          const actual = util.forecastIsInFuture(forecast)
          const expected = true
          expect(actual).to.equal(expected)
        })

      })

      context('when the day is in the future', () => {

        it('returns true', () => {
          /**
           * @todo Stub the Date class; this is hacky but ensures that the
           *       function will always return true
           */
          const now = new Date()
          const forecast = {
            date: {
              day: 32,
              hour: now.getHours()
            }
          }
          const actual = util.forecastIsInFuture(forecast)
          const expected = true
          expect(actual).to.equal(expected)
        })

      })

    })

  })

})