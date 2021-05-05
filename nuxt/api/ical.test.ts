import { getIcalString } from './ical'

beforeAll(() => {
  const date = new Date(0)
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

  jest.useFakeTimers('modern')
  jest.setSystemTime(date)
})

afterAll(() => {
  jest.useRealTimers()
})

test('gets ical string', () =>
  expect(
    getIcalString({
      authorUsername: 'authorUsername',
      description: 'description',
      end: new Date(),
      location: 'location',
      name: 'name',
      slug: 'slug',
      start: new Date(),
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
DESCRIPTION:https://maevsi.test/event/authorUsername/slug description\r
X-ALT-DESC;FMTTYPE=text/html:<p>https://maevsi.test/event/authorUsername/s\r
 lug\\ndescription</p>\\n\r
ORGANIZER;CN="authorUsername":mailto:authorUsername@maevsi.test\r
URL;VALUE=URI:https://maevsi.test/event/authorUsername/slug\r
STATUS:CONFIRMED\r
END:VEVENT\r
END:VCALENDAR`
  ))
