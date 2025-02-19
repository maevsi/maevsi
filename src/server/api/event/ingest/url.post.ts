import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import * as cheerio from 'cheerio'

const eventIngestUrlPostBodySchema = z.object({
  url: z.string(),
})

export default defineEventHandler(async (event) => {
  const openAi = useOpenAi()
  const verifyAuth = await useVerifyAuth()

  await verifyAuth()

  const body = await getBodySafe({
    event,
    schema: eventIngestUrlPostBodySchema,
  })

  const Event = z.object({
    description: z.string(),
    end: z.string().optional(),
    is_event: z.boolean(),
    location: z.string().optional(),
    name: z.string().optional(),
    start: z.string().optional(),
    url: z.string().optional(),
  })

  const response = await $fetch(body.url)

  const html = response as string
  const $ = cheerio.load(html)
  const prompt = `You are a data extraction specialist responsible for identifying and cataloging event information.
Only accept html. Only if the html contains event information, extract that information into JSON. For dates, use ISO 8601 and the current year (${new Date().getFullYear()}) if no year is given. In all other cases, set all fields to an empty string and \`is_event\` to \`false\`.`

  const completion = await openAi.beta.chat.completions.parse({
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `\`\`\`
${$.text()}
\`\`\``,
          },
        ],
      },
    ],
    model: 'gpt-4o-mini',
    response_format: zodResponseFormat(Event, 'event'),
  })
  const usageJson = completion.usage

  if (!usageJson) return

  // source: https://openai.com/api/pricing/
  const costs = parseFloat(
    (
      (usageJson.prompt_tokens * 0.15 +
        usageJson.completion_tokens * 0.6 +
        (usageJson.prompt_tokens_details?.cached_tokens ?? 0) * 0.075) /
      1e6
    ).toFixed(7),
  )
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 8,
  })

  const parsedMessage = completion.choices[0]?.message?.parsed

  return {
    output: parsedMessage,
    usage: usageJson,
    costs: formatter.format(costs),
  }
})
