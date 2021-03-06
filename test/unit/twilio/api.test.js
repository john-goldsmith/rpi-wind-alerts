const { myNumber, twilio } = require('../../../src/config')
const twilioClient = require('../../../src/twilio/client')
const api = require('../../../src/twilio/api')

describe('Twilio API', () => {

  describe('sendMessage', () => {

    const twilioMessagesCreateSpy = sinon.spy(twilioClient.messages, 'create')

    context('when no options are provided', () => {

      it('calls create with defaults', () => {
        const options = {}
        api.sendMessage(options)
        expect(twilioMessagesCreateSpy).to.have.been.calledWith({to: myNumber, from: twilio.number, body: ''})
      })

    })

    context('when options are provided', () => {

      it('calls create with the provided options', () => {
        const options = {
          to: '123',
          from: '456',
          body: 'test'
        }
        api.sendMessage(options)
        expect(twilioMessagesCreateSpy).to.have.been.calledWith({ to: options.to, from: options.from, body: options.body})
      })

    })

  })

})
