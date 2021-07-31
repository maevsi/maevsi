import slugify from 'slugify'
import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'

export default (_: Context, inject: Inject) => {
  inject('slugify', slugify)
}

declare module 'vue/types/vue' {
  interface Vue {
    $slugify: typeof slugify
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $slugify: typeof slugify
  }
  interface Context {
    $slugify: typeof slugify
  }
}
