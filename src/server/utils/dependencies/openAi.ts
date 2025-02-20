import type { ChatCompletion } from 'openai/resources/index.mjs'

const costFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 8,
})

export const useOpenAi = () => {
  const event = useEvent()

  if (!event.context.$openAi) throw createError('openai')

  return {
    getCompletionCost: (completion: ChatCompletion) => {
      const usage = completion.usage

      if (!usage) return

      // source: https://openai.com/api/pricing/
      const costs = parseFloat(
        (
          (usage.prompt_tokens * 0.15 +
            usage.completion_tokens * 0.6 +
            (usage.prompt_tokens_details?.cached_tokens ?? 0) * 0.075) /
          1e6
        ).toFixed(7),
      )

      return costFormatter.format(costs)
    },
    client: event.context.$openAi,
  }
}
