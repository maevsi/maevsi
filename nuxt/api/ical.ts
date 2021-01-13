import { ServerResponse } from 'http'
import { IncomingMessageWithBody } from '~/types/http'

export default function (
  req: IncomingMessageWithBody,
  res: ServerResponse,
  _next: any
) {
  const { htmlToText } = require('html-to-text')
  const ical = require('ical-generator')
  const moment = require('moment')
  const md = require('markdown-it')()

  const data = req.body
  const eventId = data.event.organizerUsername + '/' + data.event.slug
  const eventUrl =
    'https://' +
    (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
    '/event/' +
    eventId
  const eventDescriptionHtml = data.event.description
    ? md.render(`${eventUrl}\n${data.event.description}`)
    : ''

  res.setHeader('Content-Type', 'text/calendar')
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="' + eventId.replace('/', '_') + '.ics"'
  )
  res.end(
    ical({
      domain: process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test',
      // `prodId` is generated automatically.
      name: eventId.replace('/', '_'),
      url: eventUrl,
      // `scale` is specified as `GREGORIAN` if not set explicitly.
      timezone: 'UTC',
      method: 'REQUEST', // https://tools.ietf.org/html/rfc5546#section-3.2
      // `ttl` ... I don't think that's needed?
      events: [
        {
          id: eventId,
          // sequence: ,
          start: moment(data.event.start), // Appointment date of beginning, required.
          ...(data.event.end && { end: data.event.end }),
          // `timezone` shouldn't be needed as the database outputs UTC dates.
          timestamp: moment(), // Appointment date of creation (= now).
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
          summary: data.event.name, // The event's title.
          ...(data.event.description && {
            description: htmlToText(eventDescriptionHtml),
          }),
          ...(data.event.description && {
            htmlDescription: eventDescriptionHtml,
          }),
          ...(data.event.location && { location: data.event.location }),
          // geo: {
          //   lat: 44.4987,
          //   lon: -6.87667
          // },
          organizer: {
            name: data.event.organizerUsername,
            email:
              data.event.organizerUsername +
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
          status: 'confirmed',
          // busystatus: 'busy',
          // created: moment(), // Event creation date.
          // lastModified: moment()
        },
      ],
    }).toString()
  )
}
