// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import global from './mixins/global'

import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import slugify from 'slugify'
import VueApollo from 'vue-apollo'
import Vuelidate from 'vuelidate'
import VueMoment from 'vue-moment'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
// import { x } from '@fortawesome/free-regular-svg-icons'
import {
  faArchive,
  faBug,
  faCalendarDay,
  faCheckCircle,
  faCog,
  faDownload,
  faExternalLinkAlt,
  faGlobeAfrica,
  faHome,
  faHourglass,
  faKey,
  faMapMarker,
  faPlus,
  faSignOutAlt,
  faTrash,
  faUpload,
  faUser,
  faWindowClose
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'vue-croppa/dist/vue-croppa.css'

const apolloClient = new ApolloClient({
  uri: 'https://postgraphile.' + process.env.GRIDSOME_STACK_DOMAIN + '/graphql',
  fetch,
  request: (operation) => {
    global.methods.$jwtDecode((jwt, jwtDecoded) => {
      if (jwtDecoded.exp > Math.floor(new Date() / 1000)) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
      } else {
        console.warn('JWT expired.')
      }
    })
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

config.autoAddCss = false
library.add(
  faArchive,
  faBug,
  faCalendarDay,
  faCog,
  faDownload,
  faCheckCircle,
  faExternalLinkAlt,
  faKey,
  faGithub,
  faGlobeAfrica,
  faHome,
  faHourglass,
  faMapMarker,
  faPlus,
  faUser,
  faUpload,
  faSignOutAlt,
  faTrash,
  faWindowClose
)

export default function (Vue, { appOptions, head }) {
  Vue.component('font-awesome', FontAwesomeIcon)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.mixin(global)

  Vue.use(VueApollo)
  Vue.use(Vuelidate)
  Vue.use(VueMoment, { moment })

  Vue.prototype.$slugify = slugify

  appOptions.apolloProvider = apolloProvider
  head.htmlAttrs = { class: 'h-full' }
  head.bodyAttrs = { class: 'font-sans h-full text-white' }
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  })

  // Either authenticate or refresh token on page load.
  if (typeof window !== 'undefined') {
    const jwt = localStorage.getItem('jwt')

    if (jwt === null) {
      global.methods.$authenticateAnonymous(apolloProvider)
    } else {
      global.methods.$jwtRefresh(apolloProvider)
    }
  }
}
