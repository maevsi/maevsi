import { Inject } from '@nuxt/types/app'
import { Context } from '@nuxt/types'
import MarkdownIt from 'markdown-it'

const md = require('markdown-it')()

export default (_: Context, inject: Inject) => {
  inject('md', md)
}

declare module 'vue/types/vue' {
  interface Vue {
    $md: MarkdownIt
  }
}
