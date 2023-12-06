import { type H3Event } from 'h3'

import { SITE_URL } from '~/utils/constants'
import { getIcalString } from '~/server/utils/ical'

export default defineEventHandler(async (h3Event: H3Event) => {
  const body = await readBody(h3Event)

  const bodyChecks = [
    { property: undefined, name: 'Body' },
    { property: 'event', name: 'Event' },
  ]

  for (const bodyCheck of bodyChecks) {
    if (bodyCheck.property ? !body[bodyCheck.property] : !body)
      throw createError({
        statusCode: 400,
        statusMessage: `${bodyCheck.name} is not set!`,
      })
  }

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
