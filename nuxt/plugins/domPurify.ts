import { Inject } from '@nuxt/types-edge/app'
import { Context } from '@nuxt/types-edge'
import DOMPurify from 'isomorphic-dompurify'

export default (_: Context, inject: Inject) => {
  inject('domPurify', DOMPurify)
}
