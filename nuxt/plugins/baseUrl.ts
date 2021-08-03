import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'

export const STACK_DOMAIN =
  process.env.NUXT_ENV_STACK_DOMAIN || 'localhost:3000'
export const BASE_URL = // If NUXT_ENV_STACK_DOMAIN is missing, we assume that a http dev env is used.
  (process.env.NUXT_ENV_STACK_DOMAIN === undefined ? 'http' : 'https') +
  '://' +
  STACK_DOMAIN

export default (_: Context, inject: Inject) => {
  inject('baseUrl', BASE_URL)
}

declare module 'vue/types/vue' {
  interface Vue {
    $baseUrl: string
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $baseUrl: string
  }
  interface Context {
    $baseUrl: string
  }
}
