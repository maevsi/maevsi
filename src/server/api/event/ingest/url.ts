import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import * as cheerio from 'cheerio'

const eventIngestUrlPostBodySchema = z.object({
  url: z.string(),
})

export default defineEventHandler(async (event) => {
  await verifyAuth(event)

  const runtimeConfig = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: runtimeConfig.private.openai.apiKey,
  })
  const body = await getBodySafe({
    event,
    schema: eventIngestUrlPostBodySchema,
  })
  const Event = z.object({
    id: z.string(),
    author_account_id: z.string(),
    description: z.string(),
    end: z.string(),
    invitee_count_maximum: z.number(),
    is_archived: z.boolean(),
    is_in_person: z.boolean(),
    is_remote: z.boolean(),
    location: z.string(),
    name: z.string(),
    slug: z.string(),
    start: z.string(),
    url: z.string(),
    visibility: z.string(),
    created_at: z.string(),
  })

  const response = await $fetch(body.url)

  const html = response as string
  const $ = cheerio.load(html)

  const completion = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: 'system',
        content: `Export this event into json if the information is given else insert an empty string. Make sure:
          - proper casing and spelling is used.
          - the date format is ISO 8601`,
      },
      {
        role: 'user',
        content: $.text(),
      },
    ],
    model: 'gpt-4o-mini',
    response_format: zodResponseFormat(Event, 'event'),
  })
  const usageJson = completion.usage

  if (!usageJson) return

  const costs = parseFloat(((usageJson.total_tokens * 0.15) / 1e6).toFixed(7))
  const parsedMessage = completion.choices[0].message.parsed

  return {
    output: parsedMessage,
    usage: usageJson,
    costs: `${costs}€`,
  }
})
