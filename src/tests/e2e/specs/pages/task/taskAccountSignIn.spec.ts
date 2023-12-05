import { testPageLoad, testVisualRegression } from '../../../utils/tests'

const PAGE_PATH = '/session/create'

testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)

// TODO: mock server
// context('functionality', () => {
//   it('errors on invalid sign-in', () => {
//     cy.intercept(
//       'POST',
//       `https://postgraphile.${VIO_STAGING_HOST || 'localhost:3000'}/graphql`,
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
