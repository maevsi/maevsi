import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { getIcalString } from '~/server/api/ical.post'

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(0))
})

afterEach(() => {
  vi.useRealTimers()
})

test('gets ical string', () => {
  expect(
    getIcalString({
      host: 'maevsi.test',
      event: {
        // id: '1',
        // authorAccountId: 'authorUsername',
        description: '<p>description</p>',
        end: new Date(),
        // inviteeCountMaximum: 0,
        // isArchived: false,
        // isInPerson: false,
        // isRemote: false,
        location: 'location',
        name: 'name',
        slug: 'slug',
        start: new Date(),
        // visibility: EventVisibility.Public,
      },
      eventAuthorUsername: 'authorUsername',
    })
  ).toBe(
    `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//sebbo.net//ical-generator//EN\r
URL:https://maevsi.test/event/authorUsername/slug\r
METHOD:REQUEST\r
NAME:authorUsername_slug\r
X-WR-CALNAME:authorUsername_slug\r
BEGIN:VEVENT\r
UID:authorUsername/slug\r
SEQUENCE:0\r
DTSTAMP:19700101T000000Z\r
DTSTART:19700101T000000Z\r
DTEND:19700101T000000Z\r
SUMMARY:name\r
LOCATION:location\r
DESCRIPTION:https://maevsi.test/event/authorUsername/slug\\n\\ndescription\r
X-ALT-DESC;FMTTYPE=text/html:https://maevsi.test/event/authorUsername/slug\r
 \\n<p>description</p>\r
ORGANIZER;CN="authorUsername":mailto:authorUsername@maevsi.test\r
URL;VALUE=URI:https://maevsi.test/event/authorUsername/slug\r
STATUS:CONFIRMED\r
END:VEVENT\r
END:VCALENDAR`
  )
})
