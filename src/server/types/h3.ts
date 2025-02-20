import type OpenAI from 'openai'

declare module 'h3' {
  interface H3EventContext {
    $openAi?: OpenAI
    $timezone?: string
  }
}

export {}
