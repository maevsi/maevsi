import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import axios from 'axios'
import * as cheerio from 'cheerio'

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: runtimeConfig.private.openai.apiKey,
  })

  const Event = z.object({
    id: z.number(),
    description: z.string(),
    end: z.string(),
    invitee_count_maximum: z.number(),
    is_in_person: z.boolean(),
    is_remote: z.boolean(),
    location: z.string(),
    event_name: z.string(),
    start: z.string(),
  })

  const response = await axios.get(
    'https://veranstaltungen.uni-kassel.de/event/unikasseltransfer-feiert-20-jahre-jubilaum-4270/',
  )

  const html = response.data
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
  return completion.choices[0].message.parsed
})
