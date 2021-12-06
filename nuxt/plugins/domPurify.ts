import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'
import DOMPurify from 'isomorphic-dompurify'

export default (_: Context, inject: Inject) => {
  inject('domPurify', DOMPurify)
}
