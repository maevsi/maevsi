import { getIcalString } from '../server/api/ical'

const OLD_ENV = process.env

beforeAll(() => {
  const date = new Date(0)

  jest.useFakeTimers()
  jest.setSystemTime(date)

  jest.resetModules()
  process.env = { ...OLD_ENV }
})

afterAll(() => {
  jest.useRealTimers()
  process.env = OLD_ENV
})

test('gets ical string', () => {
  expect(
    getIcalString('maevsi.test', {
      id: '1',
      authorUsername: 'authorUsername',
      description: '<p>description</p>',
      end: new Date(),
      invitationsByEventId: {
        nodes: [],
      },
      inviteeCountMaximum: 0,
      isArchived: false,
      isInPerson: false,
      isRemote: false,
      location: 'location',
      name: 'name',
      slug: 'slug',
      start: new Date(),
      visibility: 'PUBLIC',
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
