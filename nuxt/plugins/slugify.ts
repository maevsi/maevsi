import slugify from 'slugify'
import { Inject } from '@nuxt/types-edge/app'
import { Context } from '@nuxt/types-edge'

export default (_: Context, inject: Inject) => {
  inject('slugify', slugify)
}

declare module 'vue/types/vue' {
  interface Vue {
    $slugify: typeof slugify
  }
}

declare module '@nuxt/types-edge' {
  interface NuxtAppOptions {
    $slugify: typeof slugify
  }
  interface Context {
    $slugify: typeof slugify
  }
}
