import type { H3Event } from 'h3'
import { z } from 'zod'

const icalPostBodySchema = z.object({
  contact: z
    .object({
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
    })
    .optional(),
  event: z.object({
    id: z.string(),
    description: z.string().optional().nullable(),
    end: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    name: z.string(),
    start: z.string(),
    accountByAuthorAccountId: z.object({
      id: z.string(),
      username: z.string(),
    }),
    slug: z.string(),
  }),
  invitation: z
    .object({
      id: z.string(),
    })
    .optional(),
})

export default defineEventHandler(async (h3Event: H3Event) => {
  const body = await getBodySafe({ event: h3Event, schema: icalPostBodySchema })

  const contact = body.contact
  const event = body.event
  const eventAuthorUsername = body.event.accountByAuthorAccountId.username
  const invitation = body.invitation

  setResponseHeaders(h3Event, {
    'Content-Type': 'text/calendar',
    'Content-Disposition':
      'attachment; filename="' +
      eventAuthorUsername +
      '_' +
      event.slug +
      '.ics"',
  })
  return getIcalString({ contact, event, invitation, siteUrl: SITE_URL })
})
