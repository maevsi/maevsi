import type { H3Event } from 'h3'
import { z } from 'zod'

import { SITE_URL } from '~/utils/constants'
import { getIcalString } from '~/server/utils/ical'
import { getBodySafe } from '../utils/validation'

const icalPostBodySchema = z.object({
  contact: z.object({
    id: z.string(),
    nodeId: z.string(),
    authorAccountId: z.string(),
  }),
  event: z.object({
    id: z.string(),
    name: z.string(),
    start: z.date(),
    accountByAuthorAccountId: z.object({
      id: z.string(),
      username: z.string(),
    }),
    slug: z.string(),
  }),
  invitation: z.object({
    id: z.string(),
    nodeId: z.string(),
    contactId: z.string(),
    eventId: z.string(),
  }),
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
