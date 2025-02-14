import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import sharp from 'sharp'

const eventIngestImagePostBodySchema = z.object({
  base64Image: z.string(), //.refine(
  //   (val) => {
  //     const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/
  //     return base64Regex.test(val) && val.length % 4 === 0
  //   },
  //   {
  //     message: 'Invalid base64 format',
  //   },
  // ),
})
export default defineEventHandler(async (event) => {
  const verifyAuth = await useVerifyAuth()

  await verifyAuth()

  const runtimeConfig = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: runtimeConfig.private.openai.apiKey,
  })

  const body = await getBodySafe({
    event,
    schema: eventIngestImagePostBodySchema,
  })

  const base64Buffer = Buffer.from(body.base64Image, 'base64')
  const sharpBuffer = await sharp(base64Buffer)
    .resize({
      width: 1024,
      height: 1024,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg()
    .toBuffer()

  const Event = z.object({
    // id: z.string().optional(),
    // author_account_id: z.string().optional(),
    description: z.string(),
    end: z.string().optional(),
    // invitee_count_maximum: z.number().optional(),
    // is_archived: z.boolean().optional(),
    is_event: z.boolean(),
    // is_in_person: z.boolean().optional(),
    // is_remote: z.boolean().optional(),
    location: z.string().optional(),
    name: z.string().optional(),
    // slug: z.string().optional(),
    start: z.string().optional(),
    url: z.string().optional(),
    // visibility: z.string().optional(),
    // created_at: z.string().optional(),
  })

  const completion = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: 'system',
        content: `
        You are a data extraction specialist responsible for identifying and formatting event information.
        Make sure the image is an event, and the dates are formatted in ISO 8601.

        First, check if the given image is about an event. If it is indeed an event, export this event into JSON (use an empty string for any missing information) if the input describes an event; Ensure that:
          - The given texts are about an event. If not, return an empty string.
          - All text must use proper casing and correct spelling.
          - Dates must be formatted in ISO 8601.
        `,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${sharpBuffer.toString('base64')}`,
            },
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
        usageJson.completion_tokens * 0.06 +
        (usageJson.prompt_tokens_details?.cached_tokens ?? 0) * 0.075) /
      1e6
    ).toFixed(7),
  )

  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 8,
  })
  const formattedCosts = formatter.format(costs)
  const parsedMessage = completion.choices[0]?.message?.parsed

  return {
    output: parsedMessage,
    usage: usageJson,
    costs: formattedCosts,
  }
})
