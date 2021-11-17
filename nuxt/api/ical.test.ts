import { getIcalString } from './ical'

const OLD_ENV = process.env

beforeAll(() => {
  const date = new Date(0)
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

  jest.useFakeTimers('modern')
  jest.setSystemTime(date)

  jest.resetModules()
  process.env = { ...OLD_ENV }
})

afterAll(() => {
  jest.useRealTimers()
  process.env = OLD_ENV
})

test('gets ical string', () => {
  process.env.NUXT_ENV_STACK_DOMAIN = undefined

  expect(
    getIcalString({
      id: '1',
      authorUsername: 'authorUsername',
      description: '<p>description</p>',
      end: new Date(),
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
TIMEZONE-ID:UTC\r
X-WR-TIMEZONE:UTC\r
BEGIN:VEVENT\r
UID:authorUsername/slug\r
SEQUENCE:0\r
DTSTAMP:19700101T000000\r
DTSTART:19700101T000000\r
DTEND:19700101T000000\r
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
