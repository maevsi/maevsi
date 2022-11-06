describe('ical api', () => {
  context('api load', () => {
    it('only allows POST requests', () => {
      const disallowedMethods = ['GET', 'PUT', 'DELETE', 'TRACE', 'PATCH']

      for (const disallowedMethod of disallowedMethods) {
        cy.request({
          url: '/api/ical',
          method: disallowedMethod,
          followRedirect: false,
          failOnStatusCode: false,
        }).then((resp) => {
          expect(resp.status).to.equal(405)
          expect(resp.redirectedToUrl).to.equal(undefined)
          expect(resp.body.message).to.equal('Only POST requests are allowed!')
        })
      }
    })

    it('validates input data', () => {
      const inputData = [
        { data: undefined, message: 'Body is not set!' },
        { data: { event: {}, invitation: {} }, message: 'Contact is not set!' },
        { data: { contact: {}, invitation: {} }, message: 'Event is not set!' },
        { data: { contact: {}, event: {} }, message: 'Invitation is not set!' },
      ]

      for (const inputDataElement of inputData) {
        cy.request({
          url: '/api/ical',
          method: 'POST',
          followRedirect: false,
          failOnStatusCode: false,
          body: inputDataElement.data,
        }).then((resp) => {
          expect(resp.status).to.equal(400)
          expect(resp.redirectedToUrl).to.equal(undefined)
          expect(resp.body.message).to.equal(inputDataElement.message)
        })
      }
    })
  })
})
