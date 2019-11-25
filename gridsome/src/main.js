// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

const apolloClient = new ApolloClient({
  uri: 'https://postgraphile.maevsi.test/graphql',
  request: (operation) => {
    const jwt = localStorage.getItem('jwt')
    operation.setContext({
      headers: {
        authorization: jwt ? `Bearer ${jwt}` : ''
      }
    })
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

config.autoAddCss = false;
library.add(faGithub, faUser)

// export default apolloProvider;
export default function (Vue, { appOptions, head }) {
  Vue.component('font-awesome', FontAwesomeIcon)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.use(VueApollo)

  appOptions.apolloProvider = apolloProvider
  head.htmlAttrs = {class: 'h-full'}
  head.bodyAttrs = {class: 'font-sans'}
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  })
}
