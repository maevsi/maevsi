import '@nuxt/types-edge'
import { Pinia } from 'pinia'

declare module '@nuxt/types-edge' {
  interface Context {
    $pinia: Pinia
  }
}
