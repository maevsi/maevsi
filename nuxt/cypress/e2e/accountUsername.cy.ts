describe('account username page', () => {
  context('page load', () => {
    // TODO: mock data
    // it('loads the page successfully if user exists', () => {
    //   cy.request('/account/username-that-exists').then((resp) => {
    //     expect(resp.status).to.equal(200)
    //     expect(resp.redirectedToUrl).to.equal(undefined)
    //   })
    // })

    it('does not find page if user does not exists', () => {
      cy.request({
        url: '/account/username-that-does-not-exist',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(404)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })
})
