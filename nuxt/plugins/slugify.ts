import slugify from 'slugify'
import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'

export default (_: Context, inject: Inject) => {
  inject('slugify', slugify)
}
