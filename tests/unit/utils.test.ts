import { expect, test } from 'vitest'

import { getDomainTldPort } from '#src/utils/networking'

test('gets domain, top level domain and port', () => {
  expect(getDomainTldPort('localhost')).toBe('localhost')
  expect(getDomainTldPort('localhost:1234')).toBe('localhost:1234')
  expect(getDomainTldPort('maevsi.localhost')).toBe('localhost')
  expect(getDomainTldPort('maevsi.localhost:1234')).toBe('localhost:1234')
  expect(getDomainTldPort('sub.maevsi.localhost')).toBe('localhost')
  expect(getDomainTldPort('sub.maevsi.localhost:1234')).toBe('localhost:1234')
  expect(getDomainTldPort('s.u.b.maevsi.localhost')).toBe('localhost')
  expect(getDomainTldPort('s.u.b.maevsi.localhost:1234')).toBe('localhost:1234')
  expect(getDomainTldPort('si')).toBe('si')
  expect(getDomainTldPort('si:1234')).toBe('si:1234')
  expect(getDomainTldPort('maev.si')).toBe('maev.si')
  expect(getDomainTldPort('maev.si:1234')).toBe('maev.si:1234')
  expect(getDomainTldPort('sub.maev.si')).toBe('maev.si')
  expect(getDomainTldPort('sub.maev.si:1234')).toBe('maev.si:1234')
  expect(getDomainTldPort('s.u.b.maev.si')).toBe('maev.si')
  expect(getDomainTldPort('s.u.b.maev.si:1234')).toBe('maev.si:1234')
})
