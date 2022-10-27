describe('event username eventname invitation page', () => {
  context('page load', () => {
    // TODO: mock data
    // it('forbids access when not signed in', () => {
    //   cy.request({
    //     url: '/event/username-that-exists/public-event/invitation',
    //     failOnStatusCode: false,
    //   }).then((resp) => {
    //     expect(resp.status).to.equal(403)
    //     expect(resp.redirectedToUrl).to.equal(undefined)
    //   })
    // })

    it('does not find page if user does not exists', () => {
      cy.request({
        url: '/event/username-that-does-not-exist/event-that-exists',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(404)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })

    it('does not find page if event does not exists', () => {
      cy.request({
        url: '/event/username-that-exists/event-that-does-not-exist',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(404)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })
})
