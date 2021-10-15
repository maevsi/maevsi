import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'
import DOMPurify from 'isomorphic-dompurify'
import Vue from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

Vue.use(VueDOMPurifyHTML)

export default (_: Context, inject: Inject) => {
  inject('domPurify', DOMPurify)
}
