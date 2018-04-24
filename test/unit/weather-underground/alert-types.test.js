const alertTypes = require('../../../src/weather-underground/alert-types')

describe('Weather Underground alert types', () => {

  it('is an object', () => {
    expect(alertTypes).to.an('object')
  })

  it('has properties for each alert type', () => {

    expect(alertTypes.HUR).to.equal('Hurricane Local Statement')
    expect(alertTypes.TOR).to.equal('Tornado Warning')
    expect(alertTypes.TOW).to.equal('Tornado Watch')
    expect(alertTypes.WRN).to.equal('Severe Thunderstorm Warning')
    expect(alertTypes.SEW).to.equal('Severe Thunderstorm Watch')
    expect(alertTypes.WIN).to.equal('Winter Weather Advisory')
    expect(alertTypes.FLO).to.equal('Flood Warning')
    expect(alertTypes.WAT).to.equal('Flood Watch / Statement')
    expect(alertTypes.WND).to.equal('High Wind Advisory')
    expect(alertTypes.SVR).to.equal('Severe Weather Statement')
    expect(alertTypes.HEA).to.equal('Heat Advisory')
    expect(alertTypes.FOG).to.equal('Dense Fog Advisory')
    expect(alertTypes.SPE).to.equal('Special Weather Statement')
    expect(alertTypes.FIR).to.equal('Fire Weather Advisory')
    expect(alertTypes.VOL).to.equal('Volcanic Activity Statement')
    expect(alertTypes.HWW).to.equal('Hurricane Wind Warning')
    expect(alertTypes.REC).to.equal('Record Set')
    expect(alertTypes.REP).to.equal('Public Reports')
    expect(alertTypes.PUB).to.equal('Public Information Statement')

  })

})