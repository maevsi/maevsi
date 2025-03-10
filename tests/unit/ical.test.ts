import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { getIcalString } from '#src/server/utils/ical'
import { EventVisibility } from '~/gql/generated/graphql'

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
        accountByCreatedBy: {
          id: 1,
          username: 'authorUsername',
        },
        description: '<p>description</p>',
        end: new Date(),
        // guestCountMaximum: 0,
        // isArchived: false,
        // isInPerson: false,
        // isRemote: false,
        // location: 'location',
        name: 'name',
        slug: 'slug',
        start: new Date(),
        visibility: EventVisibility.Private,
      },
      siteUrl: 'https://app.test',
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
DESCRIPTION:https://app.test/event/view/authorUsername/slug\\n\\ndescription\r
X-ALT-DESC;FMTTYPE=text/html:https://app.test/event/view/authorUsername/sl\r
 ug\\n<p>description</p>\r
ORGANIZER;CN="authorUsername":mailto:authorUsername@app.test\r
URL;VALUE=URI:https://app.test/event/view/authorUsername/slug\r
STATUS:CONFIRMED\r
CLASS:PRIVATE\r
END:VEVENT\r
END:VCALENDAR`,
  )
})
