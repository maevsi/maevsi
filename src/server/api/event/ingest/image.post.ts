import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import sharp from 'sharp'

const eventIngestImagePostBodySchema = z.object({
  base64Image: z.string(),
})
const eventSchema = z.object({
  description: z.string(),
  end: z.string().optional(),
  is_event: z.boolean(),
  location: z.string().optional(),
  name: z.string().optional(),
  start: z.string().optional(),
  url: z.string().optional(),
})
const prompt = `You are a data extraction specialist responsible for identifying and accurately cataloging event information.
Only accept images. Only if the image is an event poster containing event information, extract that information into JSON. In all other cases, set \`is_event\` to \`false\`.
If the image contains event information:
- format \`start\` and \`end\` according to ISO 8601 and use the current year (${new Date().getFullYear()}) if no year is given
- output data exactly as given, i.e. in the same language
- don't repeat the \`name\` in the \`description\``

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    return throwError({
      code: 503,
      message:
        'This endpoint is currently disabled until proper authentication and cost tracking is implemented.',
    })
  }

  const { client: openAiClient, getCompletionCost } = useOpenAi()
  const { getJwtFromHeader, verifyJwt } = await useJsonWebToken()

  const jwtDecoded = await verifyJwt(getJwtFromHeader())
  if (!(jwtDecoded.role === `${SITE_NAME}_account`))
    return throwError({
      code: 403,
      message: 'This endpoint only available to registered users.',
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
  const base64Image = sharpBuffer.toString('base64')
  // moderation is free of charge (https://platform.openai.com/docs/pricing#moderation)
  const moderation = await openAiClient.moderations.create({
    model: 'omni-moderation-latest',
    input: [
      {
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${base64Image}`,
        },
      },
    ],
  })

  const firstResult = moderation.results[0]

  if (firstResult?.flagged) {
    const flaggedCategories = Object.keys(firstResult.categories)
      .filter(
        (key) =>
          firstResult.categories[key as keyof typeof firstResult.categories],
      )
      .join(', ')

    return throwError({
      code: 403,
      message: `The image seems to contain content that has been moderated to be of the following type${flaggedCategories.length > 1 ? 's' : ''}: ${flaggedCategories}`,
    })
  }

  const completion = await openAiClient.beta.chat.completions.parse({
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    model: 'gpt-4o-mini',
    response_format: zodResponseFormat(eventSchema, 'event'),
  })

  return {
    output: completion.choices[0]?.message?.parsed,
    usage: completion.usage,
    costs: getCompletionCost(completion),
  }
})
