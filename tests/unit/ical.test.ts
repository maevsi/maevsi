import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { getIcalString } from '#src/server/utils/ical'

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
      event: {
        id: '1',
        accountByAuthorAccountId: {
          id: 1,
          username: 'authorUsername',
        },
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
      siteUrl: 'https://maevsi.test',
    }),
  ).toBe(
    `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//sebbo.net//ical-generator//EN\r
METHOD:PUBLISH\r
BEGIN:VEVENT\r
UID:1\r
SEQUENCE:0\r
DTSTAMP:19700101T000000Z\r
DTSTART:19700101T000000Z\r
DTEND:19700101T000000Z\r
SUMMARY:name\r
LOCATION:location\r
DESCRIPTION:https://maevsi.test/event/view/authorUsername/slug\\n\\ndescript\r
 ion\r
X-ALT-DESC;FMTTYPE=text/html:https://maevsi.test/event/view/authorUsername\r
 /slug\\n<p>description</p>\r
ORGANIZER;CN="authorUsername":mailto:authorUsername@maevsi.test\r
URL;VALUE=URI:https://maevsi.test/event/view/authorUsername/slug\r
STATUS:CONFIRMED\r
END:VEVENT\r
END:VCALENDAR`,
  )
})
