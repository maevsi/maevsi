import { expect, test } from 'vitest'

import { getSiteAndPort } from '#src/shared/utils/networking'

test('gets domain, top level domain and port', () => {
  expect(getSiteAndPort('localhost')).toBe('localhost')
  expect(getSiteAndPort('localhost:1234')).toBe('localhost:1234')
  expect(getSiteAndPort('maevsi.localhost')).toBe('localhost')
  expect(getSiteAndPort('maevsi.localhost:1234')).toBe('localhost:1234')
  expect(getSiteAndPort('sub.maevsi.localhost')).toBe('localhost')
  expect(getSiteAndPort('sub.maevsi.localhost:1234')).toBe('localhost:1234')
  expect(getSiteAndPort('s.u.b.maevsi.localhost')).toBe('localhost')
  expect(getSiteAndPort('s.u.b.maevsi.localhost:1234')).toBe('localhost:1234')
  expect(getSiteAndPort('si')).toBe('si')
  expect(getSiteAndPort('si:1234')).toBe('si:1234')
  expect(getSiteAndPort('maev.si')).toBe('maev.si')
  expect(getSiteAndPort('maev.si:1234')).toBe('maev.si:1234')
  expect(getSiteAndPort('sub.maev.si')).toBe('maev.si')
  expect(getSiteAndPort('sub.maev.si:1234')).toBe('maev.si:1234')
  expect(getSiteAndPort('s.u.b.maev.si')).toBe('maev.si')
  expect(getSiteAndPort('s.u.b.maev.si:1234')).toBe('maev.si:1234')
})
