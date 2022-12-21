describe('index page', () => {
  beforeEach(() => {
    cy.setCookie('cookie_control_consent', 'true')
  })

  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })

    // TODO: mock graphql server
    // it('sets the session cookie', () => {
    //   cy.visit('/')
    //   cy.getCookie('__Secure-jwt').should('exist')
    // })
  })

  context('internationalization', () => {
    const textEnglish = 'Personal invitations. Proper feedback.'
    const textGerman = 'Persönliche Einladungen. Geordnetes Feedback.'

    it('displays English translations', () => {
      cy.visit('/')
      cy.contains(textEnglish)
    })

    it('displays German translations', () => {
      cy.visit('/de')
      cy.contains(textGerman)
    })

    it('switches between English and German translations', () => {
      cy.visit('/')
      cy.contains(textEnglish)

      cy.get('[data-testid="i18n-de"]').click()
      cy.location('pathname').should('equal', '/de')
      cy.contains(textGerman)

      cy.get('[data-testid="i18n-en"]').click()
      cy.location('pathname').should('equal', '/')
      cy.contains(textEnglish)
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit('/')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
        'be.visible'
      )
      cy.compareSnapshot('index')
    })

    it('displays the cookie banner', () => {
      cy.setCookie('cookie_control_consent', 'false')
      cy.visit('/')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.compareSnapshot('index_banner')
    })
  })
})
