describe('task account sign-in page', () => {
  // beforeEach(() => {
  //   cy.visit('/task/account/sign-in')
  // })

  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/task/account/sign-in').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
    // TODO: add e2e tests for titles
    it('has the correct title when not logged in', () => {
      cy.visit('/task/account/sign-in')
      cy.title().should('equal', 'Sign in · maevsi')
    })
  })

  // TODO: mock server
  // context('functionality', () => {
  //   it('errors on invalid sign-in', () => {
  //     cy.intercept(
  //       'POST',
  //       `https://postgraphile.${STAGING_HOST || 'localhost:3000'}/graphql`,
  //       (req) => {
  //         if (hasOperationName(req, 'authenticate')) {
  //           req.alias = 'authenticate'
  //           req.reply({ fixture: 'pages/taskAccountSignIn.json' })
  //         }
  //       }
  //     )

  //     cy.get('input[id=input-username]').type('username-that-does-not-exist')
  //     cy.get('input[id=input-password]').type(`password{enter}`)

  //     // TODO: button click
  //     // cy.get('button[type="submit"]').click()

  //     cy.wait('@authenticate')
  //       .its('response')
  //       .should((res) => {
  //         if (!res) return
  //         expect(res.body.data.authenticate).to.equal(null)
  //         expect(res.body.errors.length).to.equal(1)
  //       })

  //     cy.contains('Account not found!')
  //   })
  // })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.setCookie('cookie_control_consent', 'true')
      cy.visit('/task/account/sign-in')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.compareSnapshot('taskAccountSignIn')
    })
  })
})
