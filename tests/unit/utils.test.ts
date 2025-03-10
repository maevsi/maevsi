import { expect, test } from 'vitest'

import { getRootHost } from '#src/shared/utils/networking'

test('gets domain, top level domain and port', () => {
  expect(getRootHost('localhost')).toBe('localhost')
  expect(getRootHost('localhost:1234')).toBe('localhost:1234')
  expect(getRootHost('app.localhost')).toBe('localhost')
  expect(getRootHost('app.localhost:1234')).toBe('localhost:1234')
  expect(getRootHost('sub.app.localhost')).toBe('localhost')
  expect(getRootHost('sub.app.localhost:1234')).toBe('localhost:1234')
  expect(getRootHost('s.u.b.app.localhost')).toBe('localhost')
  expect(getRootHost('s.u.b.app.localhost:1234')).toBe('localhost:1234')
  expect(getRootHost('si')).toBe('si')
  expect(getRootHost('si:1234')).toBe('si:1234')
  expect(getRootHost('maev.si')).toBe('maev.si')
  expect(getRootHost('maev.si:1234')).toBe('maev.si:1234')
  expect(getRootHost('sub.maev.si')).toBe('maev.si')
  expect(getRootHost('sub.maev.si:1234')).toBe('maev.si:1234')
  expect(getRootHost('s.u.b.maev.si')).toBe('maev.si')
  expect(getRootHost('s.u.b.maev.si:1234')).toBe('maev.si:1234')
})
