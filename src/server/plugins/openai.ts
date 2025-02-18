import OpenAI from 'openai'

export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig()

  const openAi = new OpenAI({
    apiKey: runtimeConfig.private.openai.apiKey,
  })

  nitroApp.hooks.hook('request', (event) => {
    event.context.$openAi = openAi
  })
})
