import { ServerResponse } from 'http'

import DOMPurify from 'isomorphic-dompurify'
import ical, * as icalGenerator from 'ical-generator'

import { IncomingMessageWithBody } from '~/types/http'

interface Event {
  authorUsername: string
  description: string
  end: Date
  location: string
  name: string
  slug: string
  start: Date
}

export default function (
  req: IncomingMessageWithBody,
  res: ServerResponse,
  _next: any
) {
  const event: Event = req.body.event
  res.setHeader('Content-Type', 'text/calendar')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="' + event.authorUsername + '_' + event.slug + '.ics"'
  )
  res.end(getIcalString(event))
}

export function getIcalString(event: Event): string {
  const { htmlToText } = require('html-to-text')
  const moment = require('moment')

  const userEventPath = event.authorUsername + '/' + event.slug
  const eventUrl =
    'https://' +
    (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
    '/event/' +
    userEventPath
  const eventDescriptionHtml = event.description
    ? `${eventUrl}\n${event.description}`
    : ''

  return ical({
    // `prodId` is generated automatically.
    name: userEventPath.replace('/', '_'),
    url: eventUrl,
    // `scale` is specified as `GREGORIAN` if not set explicitly.
    timezone: 'UTC',
    method: icalGenerator.ICalCalendarMethod.REQUEST, // https://tools.ietf.org/html/rfc5546#section-3.2
    // method: 'REQUEST', // https://tools.ietf.org/html/rfc5546#section-3.2
    // `ttl` ... I don't think that's needed?
    events: [
      {
        id: userEventPath,
        // sequence: ,
        start: moment(event.start), // Appointment date of beginning, required.
        ...(event.end && { end: event.end }),
        // `timezone` shouldn't be needed as the database outputs UTC dates.
        // timestamp: moment(), // Appointment date of creation (= now).
        // allDay: false,
        // floating: , // Mutually exclusive with `timezone`.
        // repeating: {
        //   freq: 'MONTHLY', // required
        //   count: 5,
        //   interval: 2,
        //   until: new Date('Jan 01 2014 00:00:00 UTC'),
        //   byDay: ['su', 'mo'], // repeat only sunday and monday
        //   byMonth: [1, 2], // repeat only in january und february,
        //   byMonthDay: [1, 15], // repeat only on the 1st and 15th
        //   bySetPos: 3, // repeat every 3rd sunday (will take the first element of the byDay array)
        //   exclude: [new Date('Dec 25 2013 00:00:00 UTC')], // exclude these dates
        //   excludeTimezone: 'Europe/Berlin' // timezone of exclude
        // },
        // recurrenceId: moment(),
        summary: event.name, // The event's title.
        ...(event.description && {
          description: {
            plain: htmlToText(DOMPurify.sanitize(eventDescriptionHtml)),
            html: eventDescriptionHtml,
          },
          // description: htmlToText(DOMPurify.sanitize(eventDescriptionHtml)),
        }),
        ...(event.location && { location: event.location }),
        organizer: {
          name: event.authorUsername,
          email:
            event.authorUsername +
            '@' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test'),
          // mailto: 'explicit@mailto.com'
        },
        // attendees: [{
        //   name: 'Me',
        //   email: 'm@e.ee',
        //   rsvp: true,
        //   role: 'req-participant',
        //   status: 'accepted',
        //   type: 'individual',
        //   delegatesTo: { email: 'to@bar.com', name: 'From' },
        //   delegatesFrom: { email: 'from@bar.com', name: 'Too' }
        // }],
        // alarms: [{
        //   type: 'display',
        //   triggerBefore: moment(),
        //   triggerAfter: moment(),
        //   repeat: 4,
        //   interval: 300,
        //   attach: 'https://example.com/notification.aud',
        //   description: 'Alarm!'
        // }],
        // categories: [{
        //   name: 'appointment'
        // }],
        url: eventUrl,
        status: icalGenerator.ICalEventStatus.CONFIRMED,
        // status: 'CONFIRMED',
        // busystatus: 'busy',
        // created: moment(), // Event creation date.
        // lastModified: moment()
      },
    ],
  }).toString()
}
