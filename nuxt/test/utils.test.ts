import { expect } from '@jest/globals'

import { getDomainTldPort } from '../utils/util'

test('gets domain, top level domain and port', () => {
  expect(getDomainTldPort('localhost')).toBe('localhost')
  expect(getDomainTldPort('localhost:1234')).toBe('localhost:1234')
  expect(getDomainTldPort('maevsi.localhost')).toBe('maevsi.localhost')
  expect(getDomainTldPort('maevsi.localhost:1234')).toBe('maevsi.localhost:1234')
  expect(getDomainTldPort('sub.maevsi.localhost')).toBe('maevsi.localhost')
  expect(getDomainTldPort('sub.maevsi.localhost:1234')).toBe('maevsi.localhost:1234')
  expect(getDomainTldPort('s.u.b.maevsi.localhost')).toBe('maevsi.localhost')
  expect(getDomainTldPort('s.u.b.maevsi.localhost:1234')).toBe('maevsi.localhost:1234')
  expect(() => getDomainTldPort('si')).toThrowError(Error)
  expect(() => getDomainTldPort('si:1234')).toThrowError(Error)
  expect(getDomainTldPort('maev.si')).toBe('maev.si')
  expect(getDomainTldPort('maev.si:1234')).toBe('maev.si:1234')
  expect(getDomainTldPort('sub.maev.si')).toBe('maev.si')
  expect(getDomainTldPort('sub.maev.si:1234')).toBe('maev.si:1234')
  expect(getDomainTldPort('s.u.b.maev.si')).toBe('maev.si')
  expect(getDomainTldPort('s.u.b.maev.si:1234')).toBe('maev.si:1234')
})
